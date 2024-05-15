const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// Create a proxy middleware instance
const proxyMiddleware = createProxyMiddleware({
  target: 'https://transport-api.axtro-soft.com',
  changeOrigin: true, // Required for target server to recognize the request's host
  pathRewrite: {
    '^/api/v1/company': '' // Remove the '/api/v1/company' prefix from the request URL
  }
  // Add any other options you may need, such as headers, etc.
})

// Mount the proxy middleware to the desired route
app.use('/', proxyMiddleware)

// Start the server
app.listen(3002, () => {
  console.log('Proxy server is running on http://localhost:3001')
})
