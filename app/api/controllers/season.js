const { validatePostBody } = require('../lib/utils')
const { Season } = require('../models')

module.exports.all = async (req, res, next) => {
  const seasons = await Season.findAll()
  res.send(seasons)
}


module.exports.create = async (req, res, next) => {
  const requiredFields = ['year']
  const body = validatePostBody(req, requiredFields)
  const season = await Season.create(body)
  res.status(201).json(season)
}

module.exports.update = async (req, res, next) => {} // 204?
