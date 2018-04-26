describe('SendRecordsToGraphqlApiCommand', () => {
  const { expect } = require('chai')
  const { random } = require('faker')
  const { mock } = require('sinon')

  const SendRecordsToGraphqlApiCommand = require('./SendRecordsToGraphqlApiCommand')

  function createDataBase64 (record) {
    return {
      data: Buffer.from(JSON.stringify(record)).toString('base64')
    }
  }

  it('returns status code of graphQL execution', async function () {
    const record1 = { anRecord: 'a value' }
    const record2 = { otherRecord: 'does not matter' }

    const recordsData = [record1, record2]
    const statusCode = random.number({ max: 599 })

    const configuration = {
      graphQL: { field: 'any Value' },
      headers: { header1: 'any value' }
    }
    const GraphqlApi = {
      executeGraphQLPost: mock('GraphqlApi.executeGraphQLPost')
    }
    const dependencies = { configuration, GraphqlApi }
    GraphqlApi.executeGraphQLPost
      .withExactArgs({
        variableValue: recordsData,
        graphQLConfiguration: configuration.graphQL,
        headers: configuration.headers
      }, dependencies)
      .resolves({ status: statusCode })

    const result = await SendRecordsToGraphqlApiCommand(recordsData.map(createDataBase64), dependencies)

    expect(result).to.deep.equal({ statusCode, body: 'ok' })
  })

  it('returns status 401  for not array records', async function () {
    const records = 'not an array'

    const result = await SendRecordsToGraphqlApiCommand(records)

    expect(result).to.deep.equal({ statusCode: 401, body: 'Records is not an array' })
  })

  it('returns status 200 and body empty for empty array of records', async function () {
    const records = []

    const result = await SendRecordsToGraphqlApiCommand(records)

    expect(result).to.deep.equal({ statusCode: 200, body: 'empty' })
  })
})
