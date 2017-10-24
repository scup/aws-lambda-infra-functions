const dependencies = {
  ReceiveSqsData: require('./Steps/ReceiveSqsData'),
  SendDataToGraphqlApi: require('./Steps/SendDataToGraphqlApi'),
  MarkSqsDataAsRead: require('./Steps/MarkSqsDataAsRead'),
  config: require('../../../Infra/config/lambdas/sqsToGraphql')
}

module.exports = function SendSqsDataToGraphqlApi (injection) {
  const { ReceiveSqsData, SendDataToGraphqlApi, MarkSqsDataAsRead, config } = Object.assign({}, dependencies, injection)

  return ReceiveSqsData(config, injection)
    .then(data => {
      if (!data || data.length === 0) {
        return
      }

      return SendDataToGraphqlApi(data, config, injection)
        .then(_ => MarkSqsDataAsRead(data, config, injection))
        .then(response => console.log(response))
    })
}
