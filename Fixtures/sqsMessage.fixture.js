const faker = require('faker')
const { Factory } = require('rosie')

const SqsMessageFixture = new Factory()
  .attr('content', () => faker.lorem.words())
  .attr('lockToken', () => faker.random.uuid())
  .attr('processingFailed', false)
  .attr('processingError', null)

SqsMessageFixture.failed = new Factory()
  .extend(SqsMessageFixture)
  .attr('processingFailed', true)
  .attr('processingError', () => new Error(faker.lorem.words()))

module.exports = SqsMessageFixture
