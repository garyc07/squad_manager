const { validatePostBody } = require('../lib/utils')
const { Match, Player, Squad } = require('../models')


// Gets all matches for the current user squad and season
module.exports.all = async (req, res, next) => {
  
  // TODO, possiby wrap the season_id within the user data at login to stop needing to query every time
  const { user: currentUser } = req.userData
  const currentSquad = await Squad.currentSquad(currentUser)

  const matches = await Match.findAll({ where: { squad_id: currentSquad.id, season_id: currentSquad.current_season_id }, include: [Player] })
  res.send(matches)
}



module.exports.findOne = async (req, res, next) => {
  const match = await Match.findOne({ where: { id: req.params.id }, include: Player })
  res.send(match)
}


// Creates a new match (using the current squad and season of the current user)
// Adds individual players and their stats to the match also 
module.exports.create = async (req, res, next) => {
  const requiredFields = ['opposition', 'date_time', 'venue', 'competition', 'goals_for', 'goals_against', 'players']
  const body = validatePostBody(req, requiredFields)

  const { user: currentUser } = req.userData
  const currentSquad = await Squad.currentSquad(currentUser)
  const matchBody = {
    squad_id: currentSquad.id,
    season_id: currentSquad.current_season_id,
    ...body
  }
  const match = await Match.create(matchBody)
  for(let player of body.players){
    const playerModel = await Player.findByPk(player.player_id)
    await match.addPlayer(playerModel, { through: player })
  }
  res.status(201).json(match)
}




module.exports.update = async (req, res, next) => {} // 204?



// TODO, probably don't need this anymore
module.exports.addPlayer = async (req, res, next) => {
  const requiredFields = ['players']
  const body = validatePostBody(req, requiredFields)
  const match = await Match.findByPk(body.match_id)
  const player = await Player.findByPk(body.player_id)

  if(!match || !player) return res.sendStatus(404)

  const mp = await match.addPlayer(player, { through: body })

  res.status(201).json(mp)
}




module.exports.players = async (req, res, next) => {
  // TODO Validation for request params
  const match = await Match.findOne({ where: { id: req.params.id }, include: [Player] })
  res.send(match)
}
