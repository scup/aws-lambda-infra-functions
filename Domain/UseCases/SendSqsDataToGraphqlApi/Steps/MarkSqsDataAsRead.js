const dependencies = {
  SqsClient: require('../../../../Infra/clients/AWS/SqsClient')
}

const classifyMessages = (groupedMessages, message) => {
  if (message.processingFailed) {
    groupedMessages.failedMessages.push(message)
  } else {
    groupedMessages.processedMessages.push(message)
  }

  return groupedMessages
}

const groupMessages = (messages) => messages.reduce(classifyMessages, { processedMessages: [], failedMessages: [] })

module.exports = function MarkSqsDataAsRead (data, config, injection) {
  const { SqsClient } = Object.assign({}, dependencies, injection)

  const groupedMessages = groupMessages(data.messages)

  const lockTokens = groupedMessages.processedMessages.map(message => message.lockToken)

  return SqsClient
    .deleteMessages(lockTokens, config.sqs, injection)
}
