const dependencies = {
  axios: require('axios')
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

module.exports = { sendData, executeGraphQLPost }

function executeGraphQLPost ({ variableValue, graphQLConfiguration, headers: extraHeaders }, injection) {
  const { axios } = Object.assign({}, dependencies, injection)
  const { url, query, variable: variableKey } = graphQLConfiguration

  const headers = { ...extraHeaders, ...defaultHeaders }

  const postData = { ...getGraphQLVariable(variableKey, variableValue), query }

  return axios.post(url, postData, { headers })
}

function sendData (eventData, graphQLConfiguration, injection) {
  return executeGraphQLPost({ variableValue: eventData, graphQLConfiguration }, injection)
}

function getGraphQLVariable (variableKey, variableValue) {
  if (!variableKey || !variableValue) return

  return {
    variables: {
      [variableKey]: variableValue
    }
  }
}
