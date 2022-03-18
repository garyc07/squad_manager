'use strict';
const { QueryTypes } = require('@sequelize/core')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Squad extends Model {
    
    static associate(models) {
      this.belongsToMany(models.Player, { through: models.PlayerSquad })
      this.hasMany(models.Match)
      this.hasMany(models.TrainingSession)
    }


    static async currentSquad(req) {
      let squadDetail
      if(req.query && req.query.season_id) {
        squadDetail = await this.findByPk(req.query.season_id)
      } else {
        // TODO Parse req for payload to get userId from JWT
        // Could we store the data needed in the token to save a db trip?
        const userId = 1
        const result = await sequelize.query(`select u.primary_squad_id as id, s.current_season_id from users u, squads s where u.id = ${userId} and s.id = u.primary_squad_id`,
          { type: QueryTypes.SELECT }
        )
        squadDetail = result[0]
      }
      return squadDetail
    }

  }
  Squad.init({
    name: DataTypes.STRING,
    current_season_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Squad',
    underscored: true
  })
  return Squad
};