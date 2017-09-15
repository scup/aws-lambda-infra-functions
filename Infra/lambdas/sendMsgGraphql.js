const createLambdaHandler = require('../createLambdaHandler')
const SendMessageGraphqlApiCommand = require('../../Domain/UseCases/SendMessageGraphqlApiCommand')

module.exports = createLambdaHandler(
  (event, context, injection) => SendMessageGraphqlApiCommand(event, injection)
)
