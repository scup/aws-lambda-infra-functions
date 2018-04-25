const dependencies = {
  GraphqlApi: require('../../../Infra/clients/GraphqlApi'),
  config: require('../../../Infra/config/lambdas/execGraphql')
}

module.exports = async function ExecuteGraphqlApiCommand (injection) {
  const { GraphqlApi, config } = Object.assign({}, dependencies, injection)

  await GraphqlApi.sendData(null, config.graphQL, injection)
}
