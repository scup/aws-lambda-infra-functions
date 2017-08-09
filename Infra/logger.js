const winston = require('winston')
const config = require('Infra/config/logger')

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      json: true,
      stringify: true,
      level: config.logLevel
    })
  ]
})
