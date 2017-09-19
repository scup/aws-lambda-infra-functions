const dependencies = {
  GraphqlApi: require('../../../Infra/clients/GraphqlApi'),
  config: require('../../../Infra/config/lambdas/sendMsgGraphql')
}

module.exports = function SendMessageGraphqlApiCommand (event, injection) {
  const { GraphqlApi, config } = Object.assign({}, dependencies, injection)

  if(!event || !event.data) return

  return GraphqlApi.sendData(event.data, config.graphQL, injection)
    .then(res => {
      return {statusCode:200, body: JSON.stringify(res)}
    })
}
