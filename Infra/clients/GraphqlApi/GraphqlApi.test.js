const sinon = require('sinon')

const GraphqlApiClient = require('./GraphqlApi')

describe('GraphqlApiClient', () => {
  describe('#sendData', () => {
    let inputParameters
    let expectedHeaders
    let dependencies

    beforeEach(() => {
      const url = 'http://someurl.com/data'
      const query = 'mutation someNamedMutation($someParameter: String!) { someMutation(someParameter: $someParameter)}'

      inputParameters = { url, query }

      expectedHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }

      dependencies = {
        axios: { post: sinon.mock() }
      }
    })

    it('called the api with the some event data', () => {
      const { url, query } = inputParameters

      const config = { url, query, variable: 'someParameter' }

      const eventData = 'some data'

      const expectedApiData = {
        query,
        variables: {
          someParameter: eventData
        }
      }

      dependencies.axios.post
        .withExactArgs(url, expectedApiData, { headers: expectedHeaders })

      GraphqlApiClient.sendData(eventData, config, dependencies)

      dependencies.axios.post.verify()
    })

    it('called the api without event data', () => {
      const { url, query } = inputParameters

      const config = { url, query }

      const expectedApiData = { query }

      dependencies.axios.post
        .withExactArgs(url, expectedApiData, { headers: expectedHeaders })

      GraphqlApiClient.sendData(null, config, dependencies)

      dependencies.axios.post.verify()
    })
  })
})
