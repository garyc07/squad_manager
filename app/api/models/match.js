const { competition_types, venue_types } = require('../../../CONSTANTS')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {

    static associate(models) {
      this.belongsTo(models.Squad, { foreignKey: 'squad_id' })
      this.belongsTo(models.Season, { foreignKey: 'season_id' })
      this.belongsToMany(models.Player, { through: models.PlayerMatch })
    }
  }
  Match.init({
    squad_id: DataTypes.INTEGER,
    season_id: DataTypes.INTEGER,
    competition: DataTypes.ENUM(competition_types),
    date_time: DataTypes.DATE,
    opposition: DataTypes.STRING,
    venue: DataTypes.ENUM(venue_types),
    goals_for: DataTypes.INTEGER,
    goals_against: DataTypes.INTEGER,
    manager_notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Match',
    underscored: true
  })
  return Match
}