module.exports = (app, auth) => {
  const router = require('express-promise-router')()
  const controller = require('../controllers/season')


  router.get('/', controller.all)
  router.post('/', controller.create)
  router.patch('/', controller.update)

  // Retrieve all Tutorials
  //router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  //router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  //router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  //router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  //router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  //router.delete("/", tutorials.deleteAll);

  app.use('/season', router)
};
