const { createDeterministApiKey } = require('./create-key')
require('dotenv').config()

const HOST = process.env.MEILI_HTTP_ADDR || 'http://localhost:7700'
const MASTER_KEY = process.env.MEILI_MASTER_KEY || 'masterKey'
const KEY_UUID = process.env.KEY_UUID || ''
const KEY_DESCRIPTION = process.env.KEY_DESCRIPTION || ''
const KEY_NAME = process.env.KEY_NAME || ''
const KEY_ACTIONS = process.env.KEY_ACTIONS || 'search'
const KEY_INDEXES = process.env.KEY_INDEXES || '*'

;(async () => {
  await createDeterministApiKey({
    host: HOST,
    apiKey: MASTER_KEY,
    keyUid: KEY_UUID,
    keyDescription: KEY_DESCRIPTION,
    keyName: KEY_NAME,
    keyActions: KEY_ACTIONS.split(','),
    keyIndexes: KEY_INDEXES.split(','),
  })
})()
