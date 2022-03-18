'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {

    static associate(models) {
      this.belongsTo(models.Squad, { foreignKey: 'squad_id' })
      this.belongsTo(models.Season, { foreignKey: 'season_id' })
      this.belongsToMany(models.Player, { through: models.PlayerMatch })
      this.belongsTo(models.Competition, { foreignKey: 'competition_id' })
    }
  }
  Match.init({
    squad_id: DataTypes.INTEGER,
    season_id: DataTypes.INTEGER,
    competition_id: DataTypes.INTEGER,
    date_time: DataTypes.DATE,
    opposition: DataTypes.STRING,
    at_home: DataTypes.BOOLEAN,
    goals_for: DataTypes.INTEGER,
    goals_against: DataTypes.INTEGER,
    manager_notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Match',
    underscored: true
  });
  return Match;
};