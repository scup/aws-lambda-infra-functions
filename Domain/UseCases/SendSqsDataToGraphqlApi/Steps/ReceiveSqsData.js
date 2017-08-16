const dependencies = {
  SqsClient: require('../../../../Infra/clients/AWS/SqsClient')
}

const SqsMessage = require('../../../Entities/SqsMessage')

const handleResults = content => {
  const contentMessages = content.Messages || []

  return contentMessages.map(message => new SqsMessage({
    content: message.Body,
    lockToken: message.ReceiptHandle
  }))
}

module.exports = function ReceiveSqsData (config, injection) {
  const { SqsClient } = Object.assign({}, dependencies, injection)

  return SqsClient
    .receiveMessages(config.sqs, injection)
    .then(handleResults)
}
