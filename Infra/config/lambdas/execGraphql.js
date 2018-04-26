const { isLocal } = require('../environment')

const localConfig = {
  graphQL: {
    url: process.env.GRAPHQL_API_URL || 'http://somegraphqlapi.com/graphql',
    query: process.env.GRAPHQL_QUERY || 'mutation { someMutation }'
  }
}

const remoteConfig = {
  graphQL: {
    url: process.env.GRAPHQL_API_URL,
    query: process.env.GRAPHQL_QUERY
  }
}

module.exports = isLocal ? localConfig : remoteConfig
