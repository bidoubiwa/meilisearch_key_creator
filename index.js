const { createDeterministApiKey } = require('./src/create-key')
require('dotenv').config()

const HOST = process.env.MEILI_HTTP_ADDR || 'http://localhost:7700'
const API_KEY = process.env.MEILI_API_KEY || 'masterKey'
const KEY_UUID = process.env.KEY_UUID || ''
const KEY_DESCRIPTION = process.env.KEY_DESCRIPTION || ''
const KEY_NAME = process.env.KEY_NAME || ''
const KEY_ACTIONS = process.env.KEY_ACTIONS || 'search'
const KEY_INDEXES = process.env.KEY_INDEXES || '*'
const KEY_EXPIRES_AT = process.env.KEY_EXPIRES_AT || null

;(async () => {
  console.log('Starting key creation...')
  await createDeterministApiKey({
    host: HOST,
    apiKey: API_KEY,
    keyUid: KEY_UUID,
    keyDescription: KEY_DESCRIPTION,
    keyName: KEY_NAME,
    keyActions: KEY_ACTIONS.split(','),
    keyIndexes: KEY_INDEXES.split(','),
    keyExpiresAt: KEY_EXPIRES_AT,
  })
  console.log('Succesfully created the key')
})()
