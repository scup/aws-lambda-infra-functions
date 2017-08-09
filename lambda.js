require('dotenv').config()

module.exports = {
  execGraphql: require('Infra/lambdas/execGraphql'),
  sqsToGraphql: require('Infra/lambdas/sqsToGraphql')
}
