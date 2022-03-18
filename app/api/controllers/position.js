const { validatePostBody } = require('../lib/utils')
const { Position } = require('../models')

module.exports.all = async (req, res, next) => {
  const positions = await Position.findAll()
  res.send(positions)
}


module.exports.create = async (req, res, next) => {
  const requiredFields = ['name', 'acronym']
  const body = validatePostBody(req, requiredFields)
  const position = await Position.create(body)
  res.status(201).json(position)
}

module.exports.update = async (req, res, next) => {} // 204?