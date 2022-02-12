import { readFile, writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'

const CERAMIC_URL = process.env.CERAMIC_URL || 'https://ceramic-clay.3boxlabs.com'

// Connect to the Ceramic node
const ceramic = new CeramicClient(CERAMIC_URL)

// Load and create a manager for the model
const bytes = await readFile(new URL('model.json', import.meta.url))
const manager = ModelManager.fromJSON(ceramic, JSON.parse(bytes.toString()))

// Write model to JSON file
const model = await manager.toPublished()
await writeFile(new URL('../../frontend/ceramic/models.json', import.meta.url), JSON.stringify(model))
await writeFile(new URL('../../metadata-wrapper/src/ceramic/models.json', import.meta.url), JSON.stringify(model))

console.log('Model written to frontend/ceramic/models.json file:', model)
