const dependencies = {
  GraphqlApi: require('../../../../../../Infra/clients/GraphqlApi')
}

const handleBatchError = (error, messages) => ({
  errors: [ error ],
  messages: messages.map(message => message.markProcessingError(error))
})

module.exports = function SendDataInBatchsPerCall (messages, config, injection) {
  const { GraphqlApi } = Object.assign({}, dependencies, injection)

  const messageContents = messages.map(message => message.content)

  const dataToSend = JSON.stringify(messageContents)

  return GraphqlApi.sendData(dataToSend, config.graphQL, injection)
    .then(_ => ({ messages }))
    .catch(error => handleBatchError(error, messages))
}
