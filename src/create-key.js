const { MeiliSearch } = require('meilisearch')
const { validateKeyCreationParams } = require('./validate')

/**
 * Creates a determinitic api key based on a provided key uuid.
 *
 * @param  {object} options
 * @param  {String} options.host - Meilisearch host
 * @param  {String} options.apiKey - Meilisearch apiKey
 * @param  {String} options.keyUid - Key uid, must be in uui4 format
 * @param  {String} [options.keyName = ''] - Key name
 * @param  {String} [options.keyDescription = ''] - Key description
 * @param  {String[]} options.keyActions - Actions that the key allows
 * @param  {String[]} options.keyIndexes - Indexes on which the key works
 * @param  {String | null} options.keyExpiresAt - Expire date of the key
 *
 * @returns {Promise<object>} Key
 */
async function createDeterministApiKey(options) {
  const {
    host,
    apiKey,
    keyUid,
    keyName = '',
    keyDescription = '',
    keyActions,
    keyIndexes,
    keyExpiresAt,
  } = options

  validateKeyCreationParams(options)

  const client = new MeiliSearch({ host, apiKey })

  // key creation
  const key = await client.createKey({
    uid: keyUid,
    name: keyName,
    description: keyDescription,
    actions: keyActions,
    indexes: keyIndexes,
    expiresAt: keyExpiresAt,
  })

  return key
}

module.exports = {
  createDeterministApiKey,
}
