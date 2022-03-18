module.exports = (app, auth) => {
  const router = require('express-promise-router')()
  const controller = require('../controllers/competition')

  router.get('/', controller.all)
  router.post('/', controller.create)
  router.patch('/', controller.update)

  app.use('/competition', router)
}