const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)


module.exports = app => {

  const auth = require('../lib/auth')

  // Require all the route files in this directory into scope
  fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => require(path.join(__dirname, file))(app, auth))


  // Error handler shared across all routes
  app.use((err, req, res, next) => {
    switch(err.name) {
      case 'SequelizeUniqueConstraintError':
        return res.status(400).send({ name: err.name, errors: err.errors });
      case 'FieldValidationError':
        return res.status(422).send({ name: err.name, errors: err.errors });
      default:
        throw err
    }
  })
    
}