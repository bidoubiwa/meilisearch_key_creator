const { createDeterministApiKey } = require('../src/create-key')
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

  test('key: create key succesfully', async () => {
    const key = await createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
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

  test('key: create key with empty keyDescription succesfully', async () => {
    const key = await createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(key.description).toEqual('')
  })

  test('key: create key with empty keyName succesfully', async () => {
    const key = await createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(key.name).toEqual('')
  })

  test('key: re-create same key should throw', async () => {
    await createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(createKeyPromise).rejects.toThrow(
      '`uid` field value `10b8db1d-33a4-4016-913c-9130aef472bf` is already an existing API key.'
    )
  })

  test('key: create key with wrong host should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      host: 123,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(createKeyPromise).rejects.toThrow('host must be a string')
  })

  test('key: create key with wrong apiKey should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      apiKey: 123,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(createKeyPromise).rejects.toThrow('apiKey must be a string')
  })

  test('key: create key with wrong uuid4 format for keyUid should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: '1234',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(createKeyPromise).rejects.toThrow('keyUid must be a valid uui4')
  })

  test('key: create key with wrong type for keyUid should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: 123,
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(createKeyPromise).rejects.toThrow('keyUid must be a string')
  })

  test('key: create key with wrong type for keyName should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 123,
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(createKeyPromise).rejects.toThrow('keyName must be a string')
  })

  test('key: create key with wrong type for keyDescription should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 123,
      keyActions: ['*'],
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(createKeyPromise).rejects.toThrow('keyDescription must be a string')
  })

  test('key: create key with wrong type for keyActions should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyActions: 'plouf',
      keyIndexes: ['*'],
      keyExpiresAt: null,
    })

    expect(createKeyPromise).rejects.toThrow(
      'keyActions must be an array of strings'
    )
  })

  test('key: create key with wrong type for keyIndexes should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyIndexes: 'plouf',
      keyActions: ['*'],
      keyExpiresAt: null,
    })

    expect(createKeyPromise).rejects.toThrow(
      'keyIndexes must be an array of strings'
    )
  })

  test('key: create key with undefined type for keyExpiresAt should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyIndexes: ['*'],
      keyActions: ['*'],
      keyExpiresAt: undefined,
    })

    expect(createKeyPromise).rejects.toThrow(
      'keyExpiresAt must be a string or a null value'
    )
  })

  test('key: create key with number type for keyExpiresAt should throw', async () => {
    const createKeyPromise = createDeterministApiKey({
      ...defaultConfig,
      keyUid: '10b8db1d-33a4-4016-913c-9130aef472bf',
      keyName: 'test-1',
      keyDescription: 'Key test 1',
      keyIndexes: ['*'],
      keyActions: ['*'],
      keyExpiresAt: 123,
    })

    expect(createKeyPromise).rejects.toThrow(
      'keyExpiresAt must be a string or a null value'
    )
  })
})
