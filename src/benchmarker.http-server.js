'use strict'
const http = require('http')

class BenchmarkServer {
  constructor ({ bPaths, rPath, port }) {
    this.bPaths = bPaths
    this.rPath = rPath
    this.port = port
    this._server = null
  }

  create () {
    this._server = http.createServer(this._httpListener.bind(this)).listen(this.port)
  }

  _httpListener (req, res) {
    if (req.url === '/api/results' && req.method === 'PUT') {
      return this._handleResults(req, res)
    } else {
      res.writeHead(200)
      res.end()
    }
  }

  async _handleResults (req, res) {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => { res.writeHead(200); res.end() })
    this.onResults(body)
  }

  onResults (results) {}
}

module.exports = BenchmarkServer