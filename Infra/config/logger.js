const localConfig = {
  logLevel: 'info'
}

const remoteConfig = {
  url: process.env.LOG_LEVEL
}

const api = {
  development: localConfig,
  test: localConfig,
  qa: remoteConfig,
  rc: remoteConfig,
  prod: remoteConfig
}

module.exports = api[require('./environment')]
