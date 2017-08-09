const dependencies = {
  logger: require('Infra/logger')
}

module.exports = function createLambdaHandler (useCase, injection) {
  return (event, context, callback) => {
    const { logger } = Object.assign({}, dependencies, injection)

    logger.info('Lambda function started...')
    logger.info('Event data: ', { event })

    return useCase(event, context, injection)
      .then(result => {
        logger.info('Lambda function executed successfully.')
        logger.info('Result: ', result)
        return callback(null, result)
      })
      .catch(error => {
        logger.error('Lambda function execution failed.')
        logger.error('Error: ', error)
        return callback(error)
      })
  }
}
