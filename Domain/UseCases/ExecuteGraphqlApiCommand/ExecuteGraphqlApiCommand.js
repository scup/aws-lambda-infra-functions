const dependencies = {
  GraphqlApi: require('../../../Infra/clients/GraphqlApi'),
  config: require('../../../Infra/config/lambdas/execGraphql')
}

module.exports = function ExecuteGraphqlApiCommand (injection) {
  const { GraphqlApi, config } = Object.assign({}, dependencies, injection)

  return GraphqlApi.sendData(null, config.graphQL, injection)
  .then(res => JSON.stringify(res.statusText))
}
