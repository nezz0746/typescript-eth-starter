import { imageController } from '../controllers/image.server.controller'
import { Express } from 'express'
import { indexController } from '../controllers/index.server.controller'
// const cron = require('node-cron')

/**
 * BIG WHY ??
 * - News oriented
 * - Game oriented
 * - Defi oriented
 *
 * Project Idea:
 * A region:
 * - Where are regions stored (1155).
 * - (Store simple regions in a registry-like data stream)
 *
 * Put geojson in attributes of token, or anywhere else in the metadata.
 * {
 *    "name": "",
 *    "description": "",
 *    "image": "",
 *    "region": GeoJson,
 *    "attributes": []
 * }
 * Give the ability to user to move and change region & show the region also on the art.
 *
 * More details about macro:
 * - Number of tolkens (warning: think of performance of ceramic and indexing)
 * - Art (warning: simple art for now.)
 * - Coming soon area.
 * - Simple UX.
 * - Non-transferable / Burnable
 *
 *
 * UX:
 * - A map of regions (Data stream)
 * - A collection of ERC-721 token to mint (between 10 and 50)
 *   - Choose starting region.
 * - Token are distributed on the map.
 * - Owners of token have "Freedom of movement". (update of metadata)
 *
 *
 * TECH PROBLEMS:
 * - How to handle transfers !? New owner is locked out of metadata.
 *      - Nullify old stream and create new one ?
 */

export default class IndexRoute {
  constructor(app: Express) {
    app.get('/registry', indexController.getRegistry)
    app.get('/registry/:id', indexController.getRegistryByTokenID)
    app.put('/registry', indexController.updateRegistry)
    app.get('/regions', indexController.getRegions)
    app.get('/:id', indexController.getMetadata)
    // TODO: Implement batchGet of tokenIDs metadata w/ cermaic multiquery
    // app.get('/:ids', () => {
    //   //
    // })
    app.put('/metadata', indexController.updateMetadata)
    // TODO: Figure out how to structure cron jobs on the collection
    // cron.schedule('* * * * *', () => {
    //   console.log('running a task every minute')
    // })

    app.post('/word', imageController.makeWordImage)
    // Regions
  }
}
