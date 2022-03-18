module.exports = (app, auth) => {
  const router = require('express-promise-router')()
  const controller = require('../controllers/position')

  router.get('/', controller.all)
  router.post('/', controller.create)
  router.patch('/', controller.update)

  app.use('/position', router)
}