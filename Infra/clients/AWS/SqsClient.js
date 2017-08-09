const dependencies = {
  AWS: require('aws-sdk')
}

const promissifySQSFunction = (func, params) => {
  return new Promise((resolve, reject) => {
    func(params, (error, data) => {
      if (error) return reject(error)
      return resolve(data)
    })
  })
}

const receiveMessages = (sqsConfig, injection) => {
  const { AWS } = Object.assign({}, dependencies, injection)

  const SQS = new AWS.SQS({ region: sqsConfig.region })

  const params = {
    QueueUrl: sqsConfig.queueUrl,
    MaxNumberOfMessages: sqsConfig.maxNumberOfMessages,
    VisibilityTimeout: sqsConfig.visibilityTimeout
  }

  return promissifySQSFunction(SQS.receiveMessage.bind(SQS), params)
}

const deleteMessages = (receiptHandles, sqsConfig, injection) => {
  const { AWS } = Object.assign({}, dependencies, injection)

  const SQS = new AWS.SQS({ region: sqsConfig.region })

  const params = {
    QueueUrl: sqsConfig.queueUrl,
    Entries: receiptHandles.map((receiptHandle, index) => ({
      Key: `${index}`,
      ReceiptHandle: receiptHandle
    }))
  }

  return promissifySQSFunction(SQS.deleteMessageBatch.bind(SQS), params)
}

module.exports = { receiveMessages, deleteMessages }
