const localConfig = {
  graphQL: {
    url: process.env.GRAPHQL_API_URL || 'http://somegraphqlapi.com/graphql',
    query: process.env.GRAPHQL_QUERY || 'mutation { someMutation }',
    variable: process.env.GRAPHQL_VAR || 'data'
  }
}

const remoteConfig = {
  graphQL: {
    url: process.env.GRAPHQL_API_URL,
    query: process.env.GRAPHQL_QUERY,
    variable: process.env.GRAPHQL_VAR
  }
}

module.exports = require('../environment').isLocal ? localConfig : remoteConfig
