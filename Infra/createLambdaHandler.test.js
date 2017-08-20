const sinon = require('sinon')

const createLambdaHandler = require('./createLambdaHandler')

describe('createLambdaHandler', () => {
  let inputParams
  let dependencies
  let useCase

  beforeEach(() => {
    inputParams = {
      event: 'someEvent',
      context: {},
      callback: sinon.mock()
    }

    dependencies = {
      logger: {
        info: sinon.mock(),
        error: sinon.mock()
      }
    }

    useCase = sinon.mock()
  })

  it('creates a handler for a use case and execute it successfully', () => {
    const { event, context, callback } = inputParams

    const result = 'some result'

    callback.withExactArgs(null, result)

    useCase
      .withExactArgs(event, context, sinon.match.object)
      .resolves(result)

    dependencies.logger.info.exactly(3)
    dependencies.logger.error.never()

    const handler = createLambdaHandler(useCase, dependencies)

    return handler(event, context, callback)
      .then(_ => {
        callback.verify()
        useCase.verify()

        dependencies.logger.info.verify()
        dependencies.logger.error.verify()
      })
  })

  it('creates a handler for a use case and execute it with failure', () => {
    const { event, context, callback } = inputParams

    const error = new Error('some error')

    callback
      .withExactArgs(error)

    useCase
      .withExactArgs(event, context, sinon.match.object)
      .rejects(error)

    dependencies.logger.info.exactly(2)
    dependencies.logger.error.once()

    const handler = createLambdaHandler(useCase, dependencies)

    return handler(event, context, callback)
      .then(_ => {
        callback.verify()
        useCase.verify()

        dependencies.logger.info.verify()
        dependencies.logger.error.verify()
      })
  })
})
