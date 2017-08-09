const { expect } = require('chai')
const faker = require('faker')
const sinon = require('sinon')

const SqsClient = require('./SqsClient')

describe('SqsClient', () => {
  let dependencies
  let sqsMock
  let sqsConfig

  before(() => {
    sqsMock = {}

    sqsConfig = {
      queueUrl: faker.internet.url(),
      maxNumberOfMessages: faker.random.number(),
      visibilityTimeout: faker.random.number(),
      region: 'someRegion'
    }

    dependencies = {
      AWS: { SQS: function (config) { return sqsMock } }
    }
  })

  describe('#receiveMessages', () => {
    let params

    before(() => {
      params = {
        QueueUrl: sqsConfig.queueUrl,
        MaxNumberOfMessages: sqsConfig.maxNumberOfMessages,
        VisibilityTimeout: sqsConfig.visibilityTimeout
      }
    })

    it('retrieve SQS messages successfully', () => {
      sqsMock.receiveMessage = sinon.mock()
        .withExactArgs(params, sinon.match.func)
        .callsArgWith(1, null, null)

      return SqsClient.receiveMessages(sqsConfig, dependencies)
        .then(_ => sqsMock.receiveMessage.verify())
    })

    it('fails to retrieve the SQS messages', () => {
      const error = 'some error'

      sqsMock.receiveMessage = sinon.mock()
        .withExactArgs(params, sinon.match.func)
        .callsArgWith(1, error, null)

      const promise = SqsClient.receiveMessages(sqsConfig, dependencies)

      return expect(promise).to.be.rejectedWith(error)
    })
  })

  describe('#deleteMessages', () => {
    let params
    let receiptHandles

    before(() => {
      receiptHandles = [ faker.random.uuid() ]

      params = {
        QueueUrl: sqsConfig.queueUrl,
        Entries: [
          { Key: `0`, ReceiptHandle: receiptHandles[0] }
        ]
      }
    })

    it('delete SQS messages successfully', () => {
      sqsMock.deleteMessageBatch = sinon.mock()
        .withExactArgs(params, sinon.match.func)
        .callsArgWith(1, null, null)

      return SqsClient.deleteMessages(receiptHandles, sqsConfig, dependencies)
        .then(_ => sqsMock.deleteMessageBatch.verify())
    })

    it('fails to delete the SQS messages', () => {
      const error = 'some error'

      sqsMock.deleteMessageBatch = sinon.mock()
        .withExactArgs(params, sinon.match.func)
        .callsArgWith(1, error, null)

      const promise = SqsClient.deleteMessages(receiptHandles, sqsConfig, dependencies)

      return expect(promise).to.be.rejectedWith(error)
    })
  })
})
