const environment = Object.assign({ NODE_ENV: 'development' }, process.env).NODE_ENV

module.exports = {
  environment,
  isLocal: ['development', 'test'].includes(environment)
}
