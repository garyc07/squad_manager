module.exports = (app, auth) => {
  const router = require('express-promise-router')()
  const controller = require('../controllers/match')

  router.get('/', controller.all)
  router.get('/:id', controller.findOne)
  router.post('/', controller.create)
  router.patch('/', controller.update)

  router.get('/:id/players', controller.players)
  
  
  router.post('/player', controller.addPlayer)

  app.use('/match', router)
}