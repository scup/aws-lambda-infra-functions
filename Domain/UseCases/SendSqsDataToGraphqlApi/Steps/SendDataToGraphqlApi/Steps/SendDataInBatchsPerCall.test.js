const { expect } = require('chai')
const sinon = require('sinon')

const SendDataInBatchsPerCall = require('./SendDataInBatchsPerCall')

const sqsMessageFixture = require('Fixtures/sqsMessage.fixture')

const SqsMessage = require('Domain/Entities/SqsMessage')

describe('SendDataInBatchsPerCall UseCase Step', () => {
  let inputParameters
  let dependencies

  beforeEach(() => {
    const messages = [
      new SqsMessage(sqsMessageFixture.build()),
      new SqsMessage(sqsMessageFixture.build())
    ]

    const messageContents = JSON.stringify(messages.map(message => message.content))

    const config = { graphQL: 'some config' }

    inputParameters = { messages, config }

    dependencies = {
      GraphqlApi: {
        sendData: sinon.mock()
          .withExactArgs(messageContents, config.graphQL, sinon.match.object)
      }
    }
  })

  it('send messages without error', () => {
    const { messages, config } = inputParameters

    dependencies.GraphqlApi.sendData
      .resolves()

    return SendDataInBatchsPerCall(messages, config, dependencies)
      .then(result => {
        expect(result.messages).to.be.deep.equal(messages)
      })
  })

  it('send messages with error', () => {
    const { messages, config } = inputParameters

    const error = new Error('some error')

    dependencies.GraphqlApi.sendData
      .rejects(error)

    return SendDataInBatchsPerCall(messages, config, dependencies)
      .then(result => {
        expect(result.messages).to.be.deep.equal(messages)

        expect(result.errors).to.have.length(1)
        expect(result.errors).to.be.deep.equal([ error ])
      })
  })
})
