'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayerPosition extends Model {

    static associate(models) {
      // define association here
    }
  }
  PlayerPosition.init({
    player_id: DataTypes.INTEGER,
    position_id: DataTypes.INTEGER,
    primary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PlayerPosition',
    underscored: true
  });
  return PlayerPosition;
};