const faker = require('faker')
const sinon = require('sinon')

const SendSqsDataToGraphqlApi = require('./SendSqsDataToGraphqlApi')

describe('SendSqsDataToGraphqlApi UseCase', () => {
  let dependencies

  beforeEach(() => {
    dependencies = {
      ReceiveSqsData: sinon.mock(),
      SendDataToGraphqlApi: sinon.mock(),
      MarkSqsDataAsRead: sinon.mock(),
      config: 'some config'
    }
  })

  it('called the api with the correct data', () => {
    const data = [ faker.lorem.word() ]

    dependencies.ReceiveSqsData
      .withExactArgs(dependencies.config, sinon.match.object)
      .resolves(data)

    dependencies.SendDataToGraphqlApi
      .withExactArgs(data, dependencies.config, sinon.match.object)
      .resolves()

    dependencies.MarkSqsDataAsRead
      .withExactArgs(data, dependencies.config, sinon.match.object)
      .resolves()

    return SendSqsDataToGraphqlApi(dependencies)
      .then(_ => {
        dependencies.ReceiveSqsData.verify()
        dependencies.SendDataToGraphqlApi.verify()
        dependencies.MarkSqsDataAsRead.verify()
      })
  })

  it('skipped api calls because receive no data from SQS', () => {
    const data = [ ]

    dependencies.ReceiveSqsData
      .withExactArgs(dependencies.config, sinon.match.object)
      .resolves(data)

    dependencies.SendDataToGraphqlApi
      .never()

    dependencies.MarkSqsDataAsRead
      .never()

    return SendSqsDataToGraphqlApi(dependencies)
      .then(_ => {
        dependencies.ReceiveSqsData.verify()
        dependencies.SendDataToGraphqlApi.verify()
        dependencies.MarkSqsDataAsRead.verify()
      })
  })
})
