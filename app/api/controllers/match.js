const { validatePostBody } = require('../lib/utils')
const { Match, Player, Competition } = require('../models')

module.exports.all = async (req, res, next) => {
  const matches = await Match.findAll({ include: [Competition, Player] })
  res.send(matches)
}

module.exports.findOne = async (req, res, next) => {
  const match = await Match.findOne({ where: { id: req.params.id }, include: Player })
  res.send(match)
}

module.exports.create = async (req, res, next) => {
  const requiredFields = ['season_id', 'competition_id', 'date_time', 'opposition', 'at_home', 'goals_for', 'goals_against']
  const body = validatePostBody(req, requiredFields)
  const match = await Match.create(body)
  res.status(201).json(match)
}

module.exports.update = async (req, res, next) => {} // 204?


module.exports.addPlayer = async (req, res, next) => {
  const requiredFields = ['match_id', 'player_id', 'mins_played']
  const body = validatePostBody(req, requiredFields)
  const match = await Match.findByPk(body.match_id)
  const player = await Player.findByPk(body.player_id)

  if(!match || !player) return res.sendStatus(404)

  const mp = await match.addPlayer(player, { through: body })

  res.status(201).json(mp)
}


module.exports.players = async (req, res, next) => {
  // TODO Validation for request params
  const match = await Match.findOne({ where: { id: req.params.id }, include: [Competition, Player] })
  res.send(match)
}
