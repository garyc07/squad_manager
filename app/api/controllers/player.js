const { validatePostBody } = require('../lib/utils')
const { Player, Match } = require('../models')

module.exports.all = async (req, res, next) => {
  const players = await Player.findAll({ include: Match })

  const p = players.map((i) => {
    const o = {} // { ...i, Matches: undefined }
    o.match_count = i.Matches.length
    return o
  })

  console.log(p)

  res.send(players)
}


module.exports.create = async (req, res, next) => {
  const requiredFields = ['first_name']
  const body = validatePostBody(req, requiredFields)
  const player = await Player.create(body)
  res.status(201).json(player)
}

module.exports.update = async (req, res, next) => {} // 204?