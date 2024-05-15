const corsProxy = require('cors-anywhere')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

corsProxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
  })
  .listen(port, host, () => {
    console.log(`CORS Anywhere server is running on ${host}:${port}`)
  })
