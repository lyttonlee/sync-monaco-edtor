const Websocket = require('ws')
const http = require('http')

const StaticServer = require('node-static').Server

const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection

const production = false
const PORT = 9500

const staticServer = new StaticServer('./', { cache: 300, gzip: production })

const server = http.createServer((req, res) => { 
  req.addListener('end', () => { 
    staticServer.serve(req, res)
  }).resume()
})

const ws = new Websocket.Server({ server })

ws.on('connection', (conn, req) => { 
  setupWSConnection(conn, req, {
    gc: true
  })
})

server.listen(PORT, () => { 
  console.log(`the server is running on port: ${PORT}`)
})