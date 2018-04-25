const sinon = require('sinon')
const { expect } = require('chai')

const GraphqlApiClient = require('./GraphqlApi')

describe('GraphqlApiClient', function () {
  const url = 'http://someurl.com/data'
  const query = 'mutation someNamedMutation($someParameter: String!) { someMutation(someParameter: $someParameter)}'
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  beforeEach(function prepareMocks () {
    this.dependencies = {
      axios: { post: sinon.mock('axios::post') }
    }
  })

  describe('#sendData/#executeGraphQLPost', function () {
    it('returns api post call sending data to graphQL', function () {
      const graphQLConfiguration = { url, query, variable: 'someParameter' }

      const eventData = 'some data'

      const expectedApiData = {
        query,
        variables: {
          someParameter: eventData
        }
      }

      this.dependencies.axios.post
        .withExactArgs(url, expectedApiData, { headers: defaultHeaders })
        .returns('a result')

      const result = GraphqlApiClient.sendData(eventData, graphQLConfiguration, this.dependencies)

      expect(result).to.equal('a result')
    })

    it('returns api post call whitout sending data to GraphQL for falsy variable configuration', function () {
      const graphQLConfiguration = { url, query, variable: null }

      const expectedApiData = { query }

      this.dependencies.axios.post
        .withExactArgs(url, expectedApiData, { headers: defaultHeaders })
        .returns('a result')

      const result = GraphqlApiClient.sendData(null, graphQLConfiguration, this.dependencies)

      expect(result).to.equal('a result')
    })

    it('returns api post call whitout sending data to GraphQL for falsy eventData', function () {
      const graphQLConfiguration = { url, query }

      const expectedApiData = { query }

      this.dependencies.axios.post
        .withExactArgs(url, expectedApiData, { headers: defaultHeaders })
        .returns('a result')

      const result = GraphqlApiClient.sendData(null, graphQLConfiguration, this.dependencies)

      expect(result).to.equal('a result')
    })

    it('returns merge graphQLConfiguration headers into headers mainting defaultHeaders', function () {
      const graphQLConfiguration = { url, query }

      const expectedApiData = { query }

      this.dependencies.axios.post
        .withExactArgs(url, expectedApiData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Other: 'this header will be send'
          }
        })
        .returns('a result')

      const result = GraphqlApiClient.executeGraphQLPost({
        graphQLConfiguration,
        headers: {
          'Content-Type': 'this value should not be used on call',
          Accept: 'this value should not be used on call',
          Other: 'this header will be send'
        }
      }, this.dependencies)

      expect(result).to.equal('a result')
    })
  })
})
