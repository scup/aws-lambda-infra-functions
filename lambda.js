require('dotenv').config()

exports.execGraphql = require('./Infra/lambdas/execGraphql')
exports.sqsToGraphql = require('./Infra/lambdas/sqsToGraphql')
exports.kinesisToGraphql = require('./Infra/lambdas/kinesisToGraphql')
exports.sendMsgGraphql = require('./Infra/lambdas/sendMsgGraphql')
