const dependencies = {
  GraphqlApi: require('../../../Infra/clients/GraphqlApi'),
  config: require('../../../Infra/config/lambdas/sendMsgGraphql')
}

module.exports = async function SendMessageGraphqlApiCommand (event, injection) {
  const { GraphqlApi, config } = Object.assign({}, dependencies, injection)

  if (!event || !event.body) return ({ statusCode: 200, body: 'empty' })

  const response = await GraphqlApi.sendData(event.body, config.graphQL, injection)

  return {
    statusCode: response.status,
    body: JSON.stringify(response.statusText),
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Origin': '*'
    }
  }
}
