const { validatePostBody } = require('../lib/utils')
const { Squad, User, Player, Match, Position, Competition, TrainingSession, SessionPlan } = require('../models')

module.exports.all = async (req, res, next) => {
  const squads = await Squad.findAll()
  res.send(squads)
}


module.exports.create = async (req, res, next) => {
  const requiredFields = ['name']
  const body = validatePostBody(req, requiredFields)
  const squad = await Squad.create(body)
  res.status(201).json(squad)
}

module.exports.update = async (req, res, next) => {} // 204?




module.exports.players = async (req, res, next) => {
  
  // TODO Get squad_id from user token or get request
  // Should be in user token for default page load for user
  const currentSquad = await Squad.currentSquad(req)

  const squad = await Squad.findByPk(currentSquad.id, {
    include: [{
      model: Player,
      include: [{
        model: Match,
        where: { squad_id: currentSquad.id, season_id: currentSquad.current_season_id },
        required: false,
        include: { model: Competition, required: false}
      }, {
        model: TrainingSession,
        where: { squad_id: currentSquad.id, season_id: currentSquad.current_season_id },
        required: false
      }, {
        model: Position,
        required: false
      }]
    }]
  })

  const boolCount = (input) => (!!input) ? 1 : 0
  const roundToTwo = (num) => +(Math.round(num + "e+2")  + "e-2") || 0


  const players = []
  squad.Players.forEach(player => {
    const matchStatsTemplate = {
      num_games_attended: 0,
      num_games_played_in: 0,
      goals: 0,
      assists: 0,
      clean_sheets: 0,
      num_mom: 0,
      num_games_started: 0,
      num_games_on_as_sub: 0,
      num_games_unused_sub: 0,
      total_mins_played: 0,
      total_ratings_count: 0
    }

    const tempPlayer = {
      player_id: player.id,
      squad_id: squad.id,
      first_name: player.first_name,
      last_name: player.last_name,
      nickname: player.nickname,
      active: player.active,
      positions: [],
      match_stats: {
        competitive: Object.create(matchStatsTemplate),
        non_competitive: Object.create(matchStatsTemplate),
        combined: {}
      },
      training_stats: {
        num_sessions_attended: 0,
        attendance_percentage: 0,
        average_rating: 0
      }
    }

    player.Positions.forEach(pos => {
      const pp = pos.PlayerPosition.get({ plain: true })
      tempPlayer.positions.push({ acronym: pos.acronym, primary: pp.primary })
    })


    player.Matches.forEach(match => {
      const pm = match.PlayerMatch.get({ plain: true })
      const thisMatchKey = (match.Competition.competitive) ? tempPlayer.match_stats.competitive : tempPlayer.match_stats.non_competitive

      thisMatchKey.num_games_attended += 1
      thisMatchKey.num_games_played_in += (pm.unused_sub) ? 0 : 1
      thisMatchKey.goals += pm.goals_scored
      thisMatchKey.assists += pm.assists
      thisMatchKey.clean_sheets += boolCount(pm.clean_sheet)
      thisMatchKey.num_mom += boolCount(pm.mom)
      thisMatchKey.num_games_started += boolCount(pm.started)
      thisMatchKey.num_games_on_as_sub += boolCount(pm.on_as_sub)
      thisMatchKey.num_games_unused_sub += boolCount(pm.unused_sub)
      thisMatchKey.total_mins_played += pm.mins_played
      thisMatchKey.total_ratings_count += pm.manager_player_rating

    })

    const compMatches = tempPlayer.match_stats.competitive
    compMatches.average_rating = roundToTwo(compMatches.total_ratings_count / compMatches.num_games_played_in)

    const nonCompMatches = tempPlayer.match_stats.non_competitive
    nonCompMatches.average_rating = roundToTwo(nonCompMatches.total_ratings_count / nonCompMatches.num_games_played_in)


    const combinedMatches = tempPlayer.match_stats.combined
    for (const [key, value] of Object.entries(compMatches)) {
      combinedMatches[key] = value + nonCompMatches[key]
    }
    combinedMatches.average_rating = roundToTwo(combinedMatches.total_ratings_count / combinedMatches.num_games_played_in)


    player.TrainingSessions.forEach(session => {
      tempPlayer.training_stats.num_sessions_attended += 1
    })

    players.push(tempPlayer)
  })

  res.send(players)
}


module.exports.matches = async (req, res, next) => {
  const currentSquad = await Squad.currentSquad(req)
  const matches = await Match.findAll({ where: { squad_id: currentSquad.id, season_id: currentSquad.current_season_id }, include: { model: Competition }})
  res.send(matches)
}


module.exports.sessions = async (req, res, next) => {
  const currentSquad = await Squad.currentSquad(req)
  const sessions = await TrainingSession.findAll({ where: { squad_id: currentSquad.id, season_id: currentSquad.current_season_id }, include: { model: SessionPlan }})
  res.send(sessions)
}