const dependencies = {
  GraphqlApi: require('../../../Infra/clients/GraphqlApi'),
  config: require('../../../Infra/config/lambdas/sendMsgGraphql')
}

module.exports = function SendMessageGraphqlApiCommand (event, injection) {
  const { GraphqlApi, config } = Object.assign({}, dependencies, injection)

  if (!event || !event.body) return

  return GraphqlApi.sendData(event.body, config.graphQL, injection)
    .then(res => {
      console.log(res)
      return {
        'statusCode': 200,
        'body': res || '',
        'headers': {
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
          'Access-Control-Allow-Origin': '*'
        }
      }
    })
}
