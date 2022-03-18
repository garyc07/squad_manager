const { validatePostBody } = require('../lib/utils')
const { Competition } = require('../models')

module.exports.all = async (req, res, next) => {
  const comps = await Competition.findAll()
  res.send(comps)
}


module.exports.create = async (req, res, next) => {
  const requiredFields = ['name', 'competitive']
  const body = validatePostBody(req, requiredFields)
  const comp = await Competition.create(body)
  res.status(201).json(comp)
}

module.exports.update = async (req, res, next) => {} // 204?