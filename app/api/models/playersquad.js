'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayerSquad extends Model {

    static associate(models) {
      //this.belongsToMany(models.Player, { through: models.PlayerSquad })
    }
  }
  PlayerSquad.init({
    player_id: DataTypes.INTEGER,
    squad_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlayerSquad',
    underscored: true
  });
  return PlayerSquad;
};