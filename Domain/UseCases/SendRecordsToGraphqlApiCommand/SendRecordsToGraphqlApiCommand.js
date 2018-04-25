const dependencies = {
  GraphqlApi: require('../../../Infra/clients/GraphqlApi'),
  configuration: require('../../../Infra/config/lambdas/kinesisToGraphql')
}

module.exports = async function SendRecordsToGraphqlApiCommand (records, injection) {
  const { GraphqlApi, configuration } = Object.assign({}, dependencies, injection)

  if (!Array.isArray(records)) return ({ statusCode: 401, body: 'Records is not an array' })
  if (!records.length) return ({ statusCode: 200, body: 'empty' })

  const { status: statusCode } = await GraphqlApi
    .executeGraphQLPost({
      variableValue: records,
      graphQLConfiguration: configuration.graphQL,
      headers: configuration.headers
    }, injection)

  return { statusCode, body: 'ok' }
}
