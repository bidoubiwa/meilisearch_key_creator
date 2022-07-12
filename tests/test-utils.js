const { MeiliSearch } = require('meilisearch')

const HOST = 'http://localhost:7700'
const MASTER_KEY = 'masterKey'

async function deleteAllNonDefaultKeys() {
  const client = new MeiliSearch({ host: HOST, apiKey: MASTER_KEY })
  const keys = await client.getKeys()

  const noneDefault = keys.results.filter(
    key => !key.name?.includes('Default ')
  )
  await Promise.all(noneDefault.map(async key => client.deleteKey(key.uid)))
}

module.exports = {
  deleteAllNonDefaultKeys,
}
