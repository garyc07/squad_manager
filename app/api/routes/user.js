module.exports = (app, auth) => {
  const router = require('express-promise-router')()
  const controller = require('../controllers/user')


  router.post('/login', auth.optional, controller.login)

  router.get('/', auth.required, controller.all)
  router.post('/', auth.required, controller.create)
  router.patch('/', auth.required, controller.update)


  app.use('/user', router)
}