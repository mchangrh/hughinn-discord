require('dotenv').config()
// http fetching
var tiny = require('tiny-json-http')
const host = process.env.HUGHINN_HOST
const port = process.env.HUGHINN_PORT
const path = process.env.HUGHINN_PATH
const url = `https://${host}:${port}${path}/status`

async function getVhStats() {
  let result = await tiny.get({url})
    .catch((err) => console.log('error', err))
  const status = result.body.online ? '🟢' : '🔴'
  return `${status} | ${result.body.players} Online`
}

module.exports = {
    getVhStats
}

