const cookie = require('cookie')

const hardcodeConfiguration = {
  environments: ['development', 'test'],
  graphQL: {
    url: 'http://localhost:9001/api',
    query: 'mutation { someMutation }',
    variable: 'data'
  },
  headers: null
}

const parametrizedConfiguration = {
  graphQL: {
    url: process.env.GRAPHQL_API_URL,
    query: process.env.GRAPHQL_QUERY,
    variable: process.env.GRAPHQL_VAR
  },
  headers: cookie.parse(process.env.GRAPHQL_HEADERS || '')
}

const isLocal = hardcodeConfiguration.environments.includes(require('../environment'))
module.exports = isLocal ? hardcodeConfiguration : parametrizedConfiguration
