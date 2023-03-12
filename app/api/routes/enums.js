const { competition_types, venue_types, position_types } = require('../../../CONSTANTS')

module.exports = (app, auth) => {
  const router = require('express-promise-router')()

  router.get('/competitions', getCompetitions)
  router.get('/venues', getVenues)
  router.get('/positions', getPositions)

  app.use('/enums', router)
}


const getCompetitions = async (req, res, next) => res.send(competition_types)

const getVenues = async (req, res, next) => res.send(venue_types)

const getPositions = async (req, res, next) => res.send(position_types)