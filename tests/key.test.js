const { createDeterministApiKey } = require('../create-key')
const { deleteAllNonDefaultKeys } = require('./test-utils')

const defaultConfig = {
  host: 'http://localhost:7700',
  apiKey: 'masterKey',
}

afterAll(() => {
  return deleteAllNonDefaultKeys()
})

describe('Test on keys', () => {
  beforeEach(async () => {
    await deleteAllNonDefaultKeys()
  })

  test('key: create key', async () => {
    const key = await createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
    })

    const keyUid = '10b8db1d-33a4-4016-913c-9130aef472bf'
    const keyName = 'test-1'
    const keyDescription = 'Key test 1'
    const deterministicKey =
      '89f76206cb30b3bd703359ffe7622a348014c7daeb9b1c8d75681f79810b43bd'

    expect(key.key).toEqual(deterministicKey)
    expect(key.uid).toEqual(keyUid)
    expect(key.name).toEqual(keyName)
    expect(key.description).toEqual(keyDescription)
  })

  test('key: create key with wrong uid', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: '1234',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
    })

    expect(createKeyPromise).rejects.toThrow('keyUid must be a valid uui4')
  })
})
