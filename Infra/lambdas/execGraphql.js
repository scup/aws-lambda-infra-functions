const createLambdaHandler = require('../createLambdaHandler')
const ExecuteGraphqlApiCommand = require('../../Domain/UseCases/ExecuteGraphqlApiCommand')

module.exports = createLambdaHandler(
  (event, context, injection) => ExecuteGraphqlApiCommand(injection)
)
