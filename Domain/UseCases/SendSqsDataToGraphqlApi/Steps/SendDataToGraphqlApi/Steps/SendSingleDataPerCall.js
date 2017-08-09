const dependencies = {
  GraphqlApi: require('Infra/clients/GraphqlApi')
}

const destructureError = ({ processingError }) => processingError
const hasError = item => destructureError(item)

const handleResult = messages => {
  return {
    errors: messages.filter(hasError).map(destructureError),
    messages
  }
}

const sendSingleMessage = (message, config, injection) => {
  const { GraphqlApi } = Object.assign({}, dependencies, injection)

  return GraphqlApi.sendData(message.content, config.graphQL, injection)
                .then(_ => message)
                .catch(error => message.markProcessingError(error))
}

module.exports = function SendSingleDataPerCall (messages, config, injection) {
  const promises = messages.map(message => sendSingleMessage(message, config, injection))

  return Promise.all(promises).then(handleResult)
}
