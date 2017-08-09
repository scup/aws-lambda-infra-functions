const { expect } = require('chai')
const sinon = require('sinon')

const SendSingleDataPerCall = require('./SendSingleDataPerCall')

const sqsMessageFixture = require('Fixtures/sqsMessage.fixture')

const SqsMessage = require('Domain/Entities/SqsMessage')

describe('SendSingleDataPerCall UseCase Step', () => {
  let inputParameters
  let dependencies

  beforeEach(() => {
    const firstMessage = new SqsMessage(sqsMessageFixture.build())
    const secondMessage = new SqsMessage(sqsMessageFixture.build())

    const messages = [ firstMessage, secondMessage ]

    const config = { graphQL: 'someConfig' }

    inputParameters = { messages, config }

    dependencies = {
      GraphqlApi: {
        sendData: sinon.mock()
          .twice()
          .withExactArgs(
            sinon.match(firstMessage.content).or(sinon.match(secondMessage.content)),
            config.graphQL,
            sinon.match.object)
      }
    }
  })

  it('send messages without error', () => {
    const { messages, config } = inputParameters

    dependencies.GraphqlApi.sendData
      .resolves()

    return SendSingleDataPerCall(messages, config, dependencies)
      .then(result => {
        expect(result.messages).to.be.deep.equal(messages)
      })
  })

  it('send messages with error', () => {
    const { messages, config } = inputParameters

    const error = new Error('some error')

    dependencies.GraphqlApi.sendData
      .onFirstCall().resolves()
      .onSecondCall().rejects(error)

    return SendSingleDataPerCall(messages, config, dependencies)
      .then(result => {
        expect(result.messages).to.be.deep.equal(messages)

        expect(result.errors).to.have.length(1)
        expect(result.errors).to.be.deep.equal([ error ])
      })
  })
})
