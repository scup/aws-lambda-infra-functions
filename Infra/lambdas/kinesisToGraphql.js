const createLambdaHandler = require('../createLambdaHandler')
const SendRecordsToGraphqlApiCommand = require('../../Domain/UseCases/SendRecordsToGraphqlApiCommand')

function handleKinesisRecords (event, _, injection) {
  return SendRecordsToGraphqlApiCommand(event.records, injection)
}

module.exports = createLambdaHandler(handleKinesisRecords)
