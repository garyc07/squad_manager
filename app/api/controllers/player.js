const { validatePostBody } = require('../lib/utils')
const { Player, Squad } = require('../models')

module.exports.all = async (req, res, next) => {
  const players = await Player.findAll({ include: [Squad] })
  res.send(players)
}


module.exports.create = async (req, res, next) => {
  const requiredFields = ['name', 'position']
  const body = validatePostBody(req, requiredFields)
  const player = await Player.create(body)
  res.status(201).send(player)
}

module.exports.update = async (req, res, next) => {} // 204?