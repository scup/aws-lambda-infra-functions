const faker = require('faker')
const { Factory } = require('rosie')

const SingleSqsMessageFixture = new Factory()
  .attr('Body', () => faker.lorem.words())
  .attr('ReceiptHandle', () => faker.random.uuid())

const ReceiveMessageResultFixture = new Factory()
  .attr('Messages', () => SingleSqsMessageFixture.buildList(1))

module.exports = ReceiveMessageResultFixture
