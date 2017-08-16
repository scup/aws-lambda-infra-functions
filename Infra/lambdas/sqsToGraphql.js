const createLambdaHandler = require('../createLambdaHandler')
const SendSqsDataToGraphqlApi = require('../../Domain/UseCases/SendSqsDataToGraphqlApi')

module.exports = createLambdaHandler(
  (event, context, injection) => SendSqsDataToGraphqlApi(injection)
)
