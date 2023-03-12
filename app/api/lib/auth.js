const jwt = require('express-jwt')

// TODO
const jwtSecret = process.env.JWT_SECRET || 'secret'

const defaultConfig = {
  secret: jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'userData',
}

const auth = {
  required: jwt({ ...defaultConfig }),
  optional: jwt({ ...defaultConfig, credentialsRequired: false })
}

module.exports = auth