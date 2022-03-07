import { Request, Response } from 'express'
import { DID } from 'dids'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { fromString } from 'uint8arrays'
import { regionsModels, registryStreamID } from '../ceramic'

const CERAMIC_URL =
  process.env.CERAMIC_URL || 'https://ceramic-clay.3boxlabs.com'
const SEED = process.env.SEED

const authenticate = async (): Promise<CeramicClient> => {
  if (!SEED) return
  // The seed must be provided as an environment variable
  const seed = fromString(SEED, 'base16')
  // Create and authenticate the DID
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: getResolver(),
  })
  await did.authenticate()

  // Connect to the Ceramic node
  const ceramic = new CeramicClient(CERAMIC_URL)
  ceramic.did = did

  return ceramic
}

export default class IndexController {
  public async getRegistry(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    const ceramic = await authenticate()

    const doc = await TileDocument.load<Record<number, string>>(
      ceramic,
      registryStreamID
    )

    const registry = doc.content

    res.json(registry)
  }

  public async getRegistryByTokenID(
    { params: { id } }: Request<{ id: string }>,
    res: Response,
    next: Function
  ): Promise<void> {
    const ceramic = await authenticate()

    const doc = await TileDocument.load<Record<number, string>>(
      ceramic,
      registryStreamID
    )

    const registry = doc.content

    res.json(registry[id])
  }

  public async updateRegistry(
    req: Request<{}, {}, { tokenID: string; streamID: string }>,
    res: Response,
    next: Function
  ): Promise<void> {
    /**
     * TODO
     * Explore early solutions for multi-party authority on metadata
     * (before multiple controller to ceramic streams are implemented)
     */

    const { tokenID, streamID } = req.body

    const ceramic = await authenticate()

    const registryDoc = await TileDocument.load<Record<number, string>>(
      ceramic,
      registryStreamID
    )

    const registry = registryDoc.content

    console.log({ [tokenID]: streamID })

    await registryDoc.update(
      { ...registry, ...{ [tokenID]: streamID } },
      {},
      { pin: true, anchor: true, publish: true }
    )

    res.json({ message: 'Registry updated.' })
  }

  public async getMetadata(
    {
      params: { id: tokenID },
    }: Request<{ id: string }, {}, { tokenID: string }>,
    res: Response,
    next: Function
  ): Promise<void> {
    const ceramic = await authenticate()

    const registryDoc = await TileDocument.load<Record<number, string>>(
      ceramic,
      registryStreamID
    )

    const registry = registryDoc.content

    if (!registry) {
      throw new Error('Regisrt does not exists')
    }

    const tokenStreamID = registry[tokenID]

    if (!tokenStreamID) {
      throw new Error('Token does not exists')
    }

    const tokenStreamDoc = await TileDocument.load<Record<number, string>>(
      ceramic,
      tokenStreamID
    )

    res.json(tokenStreamDoc.content)
  }

  public updateMetadata(req: Request, res: Response): void {
    res.json({ metadata: 'updated_metadata' })
  }

  public async getRegions(req: Request, res: Response): Promise<void> {
    const ceramic = await authenticate()

    const regions = (
      await Promise.all(
        regionsModels.map(model => TileDocument.load(ceramic, model))
      )
    ).map(doc => doc.content)

    res.json({ regions })
  }
}

export const indexController = new IndexController()
