const { expect } = require('chai')
const sinon = require('sinon')

const ReceiveSqsData = require('./ReceiveSqsData')

const SqsMessage = require('Domain/Entities/SqsMessage')

const receiveMessageFixture = require('Fixtures/SqsClient/receiveMessage.fixture')

describe('ReceiveSqsData UseCase Step', () => {
  it('receives sqs data and parse it with success', () => {
    const sqsRawData = receiveMessageFixture.build()
    const config = { sqs: 'some config' }

    const expectedResult = sqsRawData.Messages.map(message => new SqsMessage({ content: message.Body, lockToken: message.ReceiptHandle }))

    const dependencies = {
      SqsClient: {
        receiveMessages: sinon.mock()
          .withExactArgs(config.sqs, sinon.match.object)
          .resolves(sqsRawData)
      }
    }

    return ReceiveSqsData(config, dependencies)
      .then(obtainedResult => {
        expect(obtainedResult).to.be.deep.equal(expectedResult)
      })
  })

  it('receives no data from sqs and returns empty data', () => {
    const sqsRawData = receiveMessageFixture.build({ Messages: null })
    const config = { sqs: 'some config' }

    const expectedResult = []

    const dependencies = {
      SqsClient: {
        receiveMessages: sinon.mock()
          .withExactArgs(config.sqs, sinon.match.object)
          .resolves(sqsRawData)
      }
    }

    return ReceiveSqsData(config, dependencies)
      .then(obtainedResult => {
        expect(obtainedResult).to.be.deep.equal(expectedResult)
      })
  })
})
