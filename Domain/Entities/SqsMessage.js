const { Entity, validatorAdapter } = require('speck-entity')
const Joi = require('joi')
const adapter = validatorAdapter('joi', Joi)

class SqsMessage extends Entity {
  markProcessingError (error) {
    this.processingFailed = true
    this.processingError = error

    return this
  }
}

SqsMessage.SCHEMA = {
  content: adapter(Joi.string()),
  lockToken: adapter(Joi.string()),
  processingFailed: adapter(Joi.boolean().default(false)),
  processingError: adapter(Joi.object().default(null))
}

module.exports = SqsMessage
