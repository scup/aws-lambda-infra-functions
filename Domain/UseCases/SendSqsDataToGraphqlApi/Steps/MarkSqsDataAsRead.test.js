const sinon = require('sinon')

const MarkSqsDataAsRead = require('./MarkSqsDataAsRead')

const sqsMessageFixture = require('Fixtures/sqsMessage.fixture')

describe('MarkSqsDataAsRead UseCase Step', () => {
  it('remove the processed messages from SQS with sucess', () => {
    const processedMessages = sqsMessageFixture.buildList(5)
    const failedMessages = sqsMessageFixture.failed.buildList(5)

    const messages = processedMessages.concat(failedMessages)

    const config = { sqs: 'some config' }

    const lockTokens = processedMessages.map(message => message.lockToken)

    const dependencies = {
      SqsClient: {
        deleteMessages: sinon.mock()
          .withExactArgs(lockTokens, config.sqs, sinon.match.object)
      }
    }

    MarkSqsDataAsRead({ messages }, config, dependencies)

    dependencies.SqsClient.deleteMessages.verify()
  })
})
