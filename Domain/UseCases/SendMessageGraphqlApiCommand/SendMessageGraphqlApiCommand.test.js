describe('SendMessageGraphqlApiCommand UseCase', function () {
  const { expect } = require('chai')
  const { mock, match } = require('sinon')

  const SendMessageGraphqlApiCommand = require('./SendMessageGraphqlApiCommand')

  it('calls the api correctly', async function () {
    const dependencies = {
      GraphqlApi: {
        sendData: mock('GraphqlApi.sendData').resolves(true)
      },
      config: {
        graphQL: 'some config'
      }
    }

    const event = {
      body: 'some data'
    }

    dependencies.GraphqlApi.sendData
      .withExactArgs(event.body, dependencies.config.graphQL, match.object)

    await SendMessageGraphqlApiCommand(event, dependencies)
    dependencies.GraphqlApi.sendData.verify()
  })

  it('returns statusCode 200 and empty body for falsy event', async function () {
    const result = await SendMessageGraphqlApiCommand(null)
    expect(result).to.deep.equal({ statusCode: 200, body: 'empty'})
  })

  it('returns statusCode 200 and empty body for event without body', async function () {
    const result = await SendMessageGraphqlApiCommand({ event: 'without body' })
    expect(result).to.deep.equal({ statusCode: 200, body: 'empty'})
  })
})
