const dependencies = {
  SendSingleDataPerCall: require('./Steps/SendSingleDataPerCall'),
  SendDataInBatchsPerCall: require('./Steps/SendDataInBatchsPerCall')
}

module.exports = function SendDataToGraphqlApi (messages, config, injection) {
  const { SendSingleDataPerCall, SendDataInBatchsPerCall } = Object.assign({}, dependencies, injection)

  const sendingStrategy = config.acceptBatch ? SendDataInBatchsPerCall : SendSingleDataPerCall

  return sendingStrategy(messages, config, injection)
}
