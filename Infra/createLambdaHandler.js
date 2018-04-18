const dependencies = {
  logger: require('./logger')
}

module.exports = function createLambdaHandler (useCase, injection) {
  return function lambdaHandler (event, context, callback) {
    const { logger } = Object.assign({}, dependencies, injection)

    logger.info('Lambda function started...')
    logger.info('Event data: ', { event })

    return useCase(event, context, injection)
      .then(result => {
        logger.info('Lambda function executed successfully.', { result })
        return callback(null, result)
      })
      .catch(error => {
        logger.error('Lambda function execution failed.', { error })
        return callback(error)
      })
  }
}
