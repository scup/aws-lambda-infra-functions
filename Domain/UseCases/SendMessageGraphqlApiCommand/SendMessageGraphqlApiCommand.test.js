const sinon = require('sinon')

const SendMessageGraphqlApiCommand = require('./SendMessageGraphqlApiCommand')

describe('SendMessageGraphqlApiCommand UseCase', () => {
  let dependencies
  let event

  beforeEach(() => {
    dependencies = {
      GraphqlApi: {
        sendData: sinon.mock()
        .resolves(true)
      },
      config: {
        graphQL: 'some config'
      }
    }

    event = {
      data: 'some data'
    }
  })

  it('called the api correctly', () => {
    dependencies.GraphqlApi.sendData
      .withExactArgs(event.data, dependencies.config.graphQL, sinon.match.object)

      SendMessageGraphqlApiCommand(event, dependencies)

    dependencies.GraphqlApi.sendData.verify()
  })
})
