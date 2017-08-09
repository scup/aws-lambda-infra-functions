const sinon = require('sinon')
const faker = require('faker')

const SendDataToGraphqlApi = require('./SendDataToGraphqlApi')

describe('SendDataToGraphqlApi UseCase Step', () => {
  let messages
  let dependencies

  beforeEach(() => {
    messages = [ faker.lorem.words() ]

    dependencies = {
      SendDataInBatchsPerCall: sinon.mock(),
      SendSingleDataPerCall: sinon.mock()
    }
  })

  it('send messages using batch strategy', () => {
    const config = { acceptBatch: true }

    dependencies.SendDataInBatchsPerCall
      .withExactArgs(messages, config, sinon.match.object)

    dependencies.SendSingleDataPerCall.never()

    SendDataToGraphqlApi(messages, config, dependencies)

    dependencies.SendDataInBatchsPerCall.verify()
    dependencies.SendSingleDataPerCall.verify()
  })

  it('send messages using single item strategy', () => {
    const config = { acceptBatch: false }

    dependencies.SendDataInBatchsPerCall.never()

    dependencies.SendSingleDataPerCall
      .withExactArgs(messages, config, sinon.match.object)

    SendDataToGraphqlApi(messages, config, dependencies)

    dependencies.SendDataInBatchsPerCall.verify()
    dependencies.SendSingleDataPerCall.verify()
  })
})
