const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PlayerMatch extends Model {

    static associate(models) {
      //this.belongsTo(models.Player, { foreignKey: 'player_id' })
      //this.belongsTo(models.Match, { foreignKey: 'match_id' })
    }
  }
  PlayerMatch.init({
    player_id: DataTypes.INTEGER,
    match_id: DataTypes.INTEGER,
    goals_scored: DataTypes.INTEGER,
    assists: DataTypes.INTEGER,
    clean_sheet: DataTypes.BOOLEAN,
    started: DataTypes.BOOLEAN,
    on_as_sub: DataTypes.BOOLEAN,
    unused_sub: DataTypes.BOOLEAN,
    mins_played: DataTypes.INTEGER,
    manager_player_rating: DataTypes.FLOAT,
    paid_match_fee: DataTypes.BOOLEAN,
    manager_notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PlayerMatch',
    underscored: true
  })
  return PlayerMatch
}