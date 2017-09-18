require('dotenv').config()

exports.execGraphql = require('./Infra/lambdas/execGraphql')
exports.sqsToGraphql = require('./Infra/lambdas/sqsToGraphql')
exports.sendMsgGraphql = require('./Infra/lambdas/sendMsgGraphql')
