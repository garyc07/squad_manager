const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PlayerSession extends Model {

    static associate(models) {
      // define association here
    }
  }
  PlayerSession.init({
    player_id: DataTypes.INTEGER,
    training_session_id: DataTypes.INTEGER,
    manager_player_rating: DataTypes.FLOAT,
    paid_session_fee: DataTypes.BOOLEAN,
    manager_notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PlayerSession',
    underscored: true
  })
  return PlayerSession
}