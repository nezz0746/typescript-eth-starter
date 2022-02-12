import { writeFile } from "node:fs/promises";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { model as profileModel } from "@datamodels/identity-profile-basic";
import { ModelManager } from "@glazed/devtools";
import dotenv from "dotenv";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";

dotenv.config();

const CERAMIC_URL =
  process.env.CERAMIC_URL || "https://ceramic-clay.3boxlabs.com";

async function main() {
  if (!process.env.SEED) {
    throw new Error("Missing SEED environment variable");
  }
  // The seed must be provided as an environment variable
  const seed = fromString(process.env.SEED, "base16");
  // Create and authenticate the DID
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: getResolver(),
  });
  await did.authenticate();
  // Connect to the Ceramic node
  const ceramic = new CeramicClient(CERAMIC_URL);
  ceramic.did = did;

  // Create a manager for the model
  const manager = new ModelManager(ceramic);

  manager.addJSONModel(profileModel);

  const metadataSchemaID = await manager.createSchema('erc721Metadata', {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'erc721Metadata',
    type: 'object',
    properties: {
      image: {
        type: 'string',
        title: 'image',
        maxLength: 4000,
      },
      description: {
        type: 'string',
        title: 'description',
        maxLength: 4000,
      },
      name: {
        type: 'string',
        title: 'name',
        maxLength: 4000,
      },
    },
  })

  await manager.createDefinition(
    "erc721Metadata",
    {
      name: "metadata",
      description: "Stores ERC721 metadatas",
      schema: manager.getSchemaURL(metadataSchemaID)
    }
  )

  await manager.createTile(
    'ping',
    {
      name: "pingu",
      description: "un pinguin",
      image: 'https://c4-static.dodax.com/v2/600-600-118796588_1VrKw-png'
    },
    { schema: manager.getSchemaURL(metadataSchemaID) }
  )

  const streamRegistrySchemaID = await manager.createSchema('streamRegistry', {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'streamRegistry',
    type: 'object',
  })

  await manager.createDefinition(
    "streamRegistry",
    {
      name: "Stream Registry",
      description: "Map of tokenID to streamID",
      schema: manager.getSchemaURL(streamRegistrySchemaID)
    }
  )

  const registryID = await manager.createTile(
    'Mutable NFT Stream Registry',
    {},
    { schema: manager.getSchemaURL(streamRegistrySchemaID) }
  )

  await ceramic.pin.add(registryID)
  await ceramic.requestAnchor(registryID)


  // Write model to JSON file
  await writeFile(new URL('model.json', import.meta.url), JSON.stringify(manager.toJSON()))
  console.log('Encoded model written to scripts/model.json file')
}

main();
