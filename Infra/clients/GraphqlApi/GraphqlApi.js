const dependencies = {
  axios: require('axios')
}

module.exports = {
  sendData (eventData, config, injection) {
    const { axios } = Object.assign({}, dependencies, injection)

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

    const { url, query, variable } = config

    const data = { query }

    if (eventData && variable) {
      data.variables = {
        [variable]: eventData
      }
    }

    return axios.post(url, data, { headers })
  }
}
