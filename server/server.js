const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// Create a proxy middleware
const proxy = createProxyMiddleware({
  target: 'https://transport-api.axtro-soft.com',
  changeOrigin: true,
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  }
})

// Apply the proxy middleware to the desired route
app.use('/api/v1/company', proxy)

// Start the server
app.listen(3001, () => {
  console.log('Proxy server listening on port 3001')
})
