const dependencies = {
  GraphqlApi: require('../../../Infra/clients/GraphqlApi'),
  config: require('../../../Infra/config/lambdas/sendMsgGraphql')
}

module.exports = function SendMessageGraphqlApiCommand (event, injection) {
  const { GraphqlApi, config } = Object.assign({}, dependencies, injection)

  if (!event || !event.body) return

  return GraphqlApi.sendData(event.body, config.graphQL, injection)
    .then(res => {
      return JSON.stringify({ statusCode: 200, body: res })
    })
}
