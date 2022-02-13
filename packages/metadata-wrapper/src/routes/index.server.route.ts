import { imageController } from '../controllers/image.server.controller'
import { Express } from 'express'
import { indexController } from '../controllers/index.server.controller'
const cron = require('node-cron')

export default class IndexRoute {
  constructor(app: Express) {
    app.get('/registry', indexController.getRegistry)
    app.put('/registry', indexController.updateRegistry)
    app.get('/metadata', indexController.getMetadata)
    app.put('/metadata', indexController.updateMetadata)
    // TODO: Figure out how to structure cron jobs on the collection
    cron.schedule('* * * * *', () => {
      console.log('running a task every minute')
    })

    app.post('/word', imageController.makeWordImage)
  }
}
