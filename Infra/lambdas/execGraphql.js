const createLambdaHandler = require('../lambdaHandlerBuilder')
const ExecuteGraphqlApiCommand = require('../../Domain/UseCases/ExecuteGraphqlApiCommand')

module.exports.handler = createLambdaHandler(
  (event, context, injection) => ExecuteGraphqlApiCommand(injection)
)
