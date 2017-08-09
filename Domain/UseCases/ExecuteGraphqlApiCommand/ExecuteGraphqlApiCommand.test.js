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

    ExecuteGraphqlApiCommand(dependencies)

    dependencies.GraphqlApi.sendData.verify()
  })
})
