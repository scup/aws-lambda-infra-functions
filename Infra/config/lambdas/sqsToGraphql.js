const { isLocal } = require('../environment')
const convertToBoolean = require('../../convertToBoolean')

const localConfig = {
  graphQL: {
    url: process.env.GRAPHQL_API_URL || 'http://somegraphqlapi.com/graphql',
    query: process.env.GRAPHQL_QUERY || 'mutation aMutation($eventData: String!) { someMutation(eventData: $eventData) }',
    variable: process.env.GRAPHQL_QUERY_VARIABLE || 'eventData',
    acceptBatch: convertToBoolean(process.env.GRAPHQL_ACCEPT_BATCH || false)
  },
  sqs: {
    queueUrl: process.env.AWS_SQS_QUEUE_URL || 'some qsq url',
    maxNumberOfMessages: 10,
    visibilityTimeout: 30,
    region: 'us-east-1'
  }
}

const remoteConfig = {
  graphQL: {
    url: process.env.GRAPHQL_API_URL,
    query: process.env.GRAPHQL_QUERY,
    variable: process.env.GRAPHQL_QUERY_VARIABLE,
    acceptBatch: convertToBoolean(process.env.GRAPHQL_ACCEPT_BATCH)
  },
  sqs: {
    queueUrl: process.env.AWS_SQS_QUEUE_URL,
    maxNumberOfMessages: process.env.AWS_SQS_MAX_MESSAGES,
    visibilityTimeout: process.env.AWS_SQS_VISIBILITY_TIMEOUT,
    region: process.env.AWS_SQS_REGION
  }
}

module.exports = isLocal ? localConfig : remoteConfig
