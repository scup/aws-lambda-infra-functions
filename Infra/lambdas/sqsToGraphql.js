const createLambdaHandler = require('Infra/lambdaHandlerBuilder')
const SendSqsDataToGraphqlApi = require('Domain/UseCases/SendSqsDataToGraphqlApi')

module.exports.handler = createLambdaHandler(
  (event, context, injection) => SendSqsDataToGraphqlApi(injection)
)
