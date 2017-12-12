# AWS Lambda Infra functions

This project has some common lambdas that can help you to automate some tasks in your system.

# How to build the lambdas

You can build the lambdas ready to upload to AWS using the following command:

```bash
yarn build
```

The zip file will be created on **packages** folder

# How to test the lambda locally

```bash
yarn debug -- --function lambda_name
```

## Configuring and using Lambdas

To use a lambda published in this library, you need to upload the zip file built by this library, set the a handler point to the specific lambda and set a group of environment variables used in the lambda configuration.

### execGraphQL

**handler**: lambda.execGraphQL

**description**: this function provides way to executes a common GraphQL call to a GraphQL API. One possible way to use this lambda is to execute a GraphQL periodically in a type of batch process.

**environment variables**:

- GRAPHQL_API_URL: the full url to call a GraphQL query/mutation. Example: http://somegraphqlapi.com/graphql
- GRAPHQL_QUERY: the query to be executed in the GraphQL API. Example: 'mutation { someMutation }'

### sqsToGraphql

**handler**: lambda.sqsToGraphql

**description**: this function retrieves data from a SQS queue and forward it a GraphQL API to further process.

**environment variables**:

- GRAPHQL_API_URL: the full url to call a GraphQL query/mutation. Example: http://somegraphqlapi.com/graphql
- GRAPHQL_QUERY: the query to be executed in the GraphQL API. Example: 'mutation ($data:String!){ someMutation(data:$data) }'
- GRAPHQL_VAR: the name of the variable that will receive the SQS data. Example: 'data'
- GRAPHQL_ACCEPT_BATCH: when its value is 'true' indicate that the function will do only a call to the API with all data extracted from SQS, otherwise the function will call the API multiple times, sending one message per call
- AWS_SQS_QUEUE_URL: the ARN of the SQS queue
- AWS_SQS_MAX_MESSAGES: maximum number of messages that will be retrieved from this function. Example: 10
- AWS_SQS_VISIBILITY_TIMEOUT: indicate the maximum number of seconds that the data will not be visible when retrieved from SQS. Example: 30
- AWS_SQS_REGION: AWS region where the SQS is located. Example: 'us-east-1'

### sendMsgGraphql

**handler**: lambda.sendMsgGraphql

**description**: function that redirects an POST received into an API Gateway endpoint to a GraphQL API.

**environment variables**:

- GRAPHQL_API_URL: the full url to call a GraphQL query/mutation. Example: http://somegraphqlapi.com/graphql
- GRAPHQL_QUERY: the query to be executed in the GraphQL API. Example: 'mutation ($data:String!){ someMutation(data:$data) }'
- GRAPHQL_VAR: the name of the variable that will receive the entire content from the HTTP body. Example: 'data'
