const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const https = require('https')
const fs = require('fs')

const app = express()

// Proxy middleware configuration
const apiProxy = createProxyMiddleware({
  target: 'https://transport-api.axtro-soft.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/v1/company': '/api/v1/company'
  },
  secure: true // Enable HTTPS
})

// Use the proxy middleware for '/api/v1/company'
app.use('/api/v1/company', apiProxy)

// Start the server
const port = 443
https.createServer(app).listen(port, () => {
  console.log(`Proxy server is running on https://transport-api.axtro-soft.com/api/v1/company`)
})
