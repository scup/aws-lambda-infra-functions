const sinon = require('sinon')

const ExecuteGraphqlApiCommand = require('./ExecuteGraphqlApiCommand')

describe('ExecuteGraphqlApiCommand UseCase', function () {
  it('called the api correctly', async function () {
    const dependencies = {
      GraphqlApi: {
        sendData: sinon.mock()
      },
      config: {
        graphQL: 'some config'
      }
    }

    dependencies.GraphqlApi.sendData
      .withExactArgs(null, dependencies.config.graphQL, sinon.match.object)
      .resolves()

    await ExecuteGraphqlApiCommand(dependencies)
    dependencies.GraphqlApi.sendData.verify()
  })
})
