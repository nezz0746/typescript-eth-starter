require('dotenv').config()
import * as http from 'http'
import { PORT } from './var/config'
import app from './server'

const server: http.Server = http.createServer(app)

server.listen(PORT)

server.on('listening', () => {
  console.log(
    `Server started on port ${PORT} on env ${process.env.NODE_ENV || 'dev'}`
  )
})

export default {
  server,
}
