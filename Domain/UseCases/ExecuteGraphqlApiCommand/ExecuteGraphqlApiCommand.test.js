const sinon = require('sinon')

const ExecuteGraphqlApiCommand = require('./ExecuteGraphqlApiCommand')

describe('ExecuteGraphqlApiCommand UseCase', () => {
  let dependencies

  beforeEach(() => {
    dependencies = {
      GraphqlApi: {
        sendData: sinon.mock()
      },
      config: {
        graphQL: 'some config'
      }
    }
  })

  it('called the api correctly', () => {
    dependencies.GraphqlApi.sendData
      .withExactArgs(null, dependencies.config.graphQL, sinon.match.object)
      .resolves()

    return ExecuteGraphqlApiCommand(dependencies)
      .then(_ => dependencies.GraphqlApi.sendData.verify())
  })
})
