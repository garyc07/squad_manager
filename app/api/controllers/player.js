const { validatePostBody } = require('../lib/utils')
const { Player, Squad, Position } = require('../models')

module.exports.all = async (req, res, next) => {
  const players = await Player.findAll({ include: [Squad, Position] })
  res.send(players)
}


module.exports.create = async (req, res, next) => {
  const requiredFields = ['first_name', 'last_name']
  const body = validatePostBody(req, requiredFields)
  const player = await Player.create(body)
  res.status(201).json(player)
}

module.exports.update = async (req, res, next) => {} // 204?