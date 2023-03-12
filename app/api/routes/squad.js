module.exports = (app, auth) => {
  const router = require('express-promise-router')()
  const controller = require('../controllers/squad')

  router.get('/', controller.all)
  router.post('/', controller.create)
  router.patch('/', controller.update)

  router.get('/players', auth.required, controller.players)
  router.post('/player', controller.addPlayer)

  router.get('/matches', controller.matches)
  router.get('/sessions', controller.sessions)

  app.use('/squad', router)
}