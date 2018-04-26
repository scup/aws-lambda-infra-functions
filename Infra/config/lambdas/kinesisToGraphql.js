const cookie = require('cookie')
const { isLocal } = require('../environment')

const hardcodeConfiguration = {
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

module.exports = isLocal ? hardcodeConfiguration : parametrizedConfiguration
