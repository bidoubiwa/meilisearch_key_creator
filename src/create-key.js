const { MeiliSearch } = require('meilisearch')

/**
 * Validates if provided uuid is a correct uuid4 format
 *
 * @param  {String} uuid
 *
 * @returns {boolean} true if correct format, else, false
 */
function validateUuid4(uuid) {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  return regexExp.test(uuid)
}

/**
 * Validates if the provided array only contains strings
 *
 * @param  {String[]} arr - Array to check
 *
 * @returns {boolean} true if array only contains strings
 */
function arrayOnlyContainsStrings(arr) {
  const nonStrings = arr.find(elem => typeof elem !== 'string')

  return !nonStrings
}

/**
 * Validates the user inputs
 *
 * @param  {object} options
 * @param  {String} options.host - Meilisearch host
 * @param  {String} options.apiKey - Meilisearch apiKey
 * @param  {String} options.keyUid - Key uid, must be in uui4 format
 * @param  {String} options.keyName - Key name
 * @param  {String} options.keyDescription - Key description
 * @param  {String[]} options.keyActions - Actions that the key allows
 * @param  {String[]} options.keyIndexes - Indexes on which the key works
 *
 * @returns {void}
 */
function validateParams(options) {
  const {
    host,
    apiKey,
    keyUid,
    keyName,
    keyDescription,
    keyActions,
    keyIndexes,
  } = options

  if (typeof host !== `string`) {
    throw Error('Host must be a string')
  }

  if (typeof apiKey !== `string`) {
    throw Error('apiKey must be a string')
  }

  if (typeof keyUid !== `string`) {
    throw Error('keyUid must be a string')
  }

  if (!validateUuid4(keyUid)) {
    throw Error('keyUid must be a valid uui4')
  }

  if (typeof keyName !== `string`) {
    throw Error('keyName must be a string')
  }

  if (typeof keyDescription !== `string`) {
    throw Error('keyDescription must be a string')
  }

  console.log({ keyActions, keyIndexes })

  if (!Array.isArray(keyActions) || !arrayOnlyContainsStrings(keyActions)) {
    throw Error('keyActions must be an array of strings')
  }
  if (!Array.isArray(keyIndexes) || !arrayOnlyContainsStrings(keyIndexes)) {
    throw Error('keyIndexes must be an array of strings')
  }
}

/**
 * Creates a determinitic api key based on a provided key uuid.
 *
 * @param  {object} options
 * @param  {String} options.host - Meilisearch host
 * @param  {String} options.apiKey - Meilisearch apiKey
 * @param  {String} options.keyUid - Key uid, must be in uui4 format
 * @param  {String} options.keyName - Key name
 * @param  {String} options.keyDescription - Key description
 * @param  {String[]} options.keyActions - Actions that the key allows
 * @param  {String[]} options.keyIndexes - Indexes on which the key works
 *
 * @returns {Promise<object>} Key
 */
async function createDeterministApiKey(options) {
  const {
    host,
    apiKey,
    keyUid,
    keyName,
    keyDescription,
    keyActions,
    keyIndexes,
  } = options

  validateParams(options)

  const client = new MeiliSearch({ host, apiKey })

  // key creation
  const key = await client.createKey({
    uid: keyUid,
    name: keyName,
    description: keyDescription,
    actions: keyActions,
    indexes: keyIndexes,
    expiresAt: null,
  })

  return key
}

module.exports = {
  createDeterministApiKey,
}
