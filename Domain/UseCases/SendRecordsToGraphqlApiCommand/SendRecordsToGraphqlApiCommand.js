const dependencies = {
  GraphqlApi: require('../../../Infra/clients/GraphqlApi'),
  configuration: require('../../../Infra/config/lambdas/kinesisToGraphql')
}

function convertDataInObject ({ data }) {
  return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'))
}

module.exports = async function SendRecordsToGraphqlApiCommand (records, injection) {
  if (!Array.isArray(records)) return ({ statusCode: 401, body: 'Records is not an array' })
  if (!records.length) return ({ statusCode: 200, body: 'empty' })

  const { GraphqlApi, configuration } = Object.assign({}, dependencies, injection)

  const recordsData = records.map(convertDataInObject)

  const { status: statusCode } = await GraphqlApi
    .executeGraphQLPost({
      variableValue: recordsData,
      graphQLConfiguration: configuration.graphQL,
      headers: configuration.headers
    }, injection)

  return { statusCode, body: 'ok' }
}
