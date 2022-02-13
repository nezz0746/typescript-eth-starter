import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import * as path from 'path'

import { MODELS_DIR, ROUTES_DIR } from '../var/config'
import { globFiles } from '../helpers'

const app: express.Express = express()

for (const model of globFiles(MODELS_DIR)) {
  require(path.resolve(model))
}

app.use(
  cors({
    origin: '*',
  })
)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

for (const route of globFiles(ROUTES_DIR)) {
  require(path.resolve(route)).default(app)
}

export default app
