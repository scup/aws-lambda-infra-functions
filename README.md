# AWS Lambda Infra functions

This project has some common lambdas that can help you to automate some tasks in your system.

Today we have the following lambdas in this project:

- execGraphql: function which executes a common GraphQL call to a GraphQL API
- sqsToGraphql: function that retrieves some SQS data from a queue and sends its data to a GraphQL API

# How To build the lambdas

You can build the lambdas ready to upload to AWS using the following command:

```bash
yarn build
```

The zip file will be created on **.serverless** folder

# How to test the lambda locally

```bash
yarn debug -- --function lambda_name
```

# Config Lambda

Use serverless.yml to change lambda settings like name, etc.
