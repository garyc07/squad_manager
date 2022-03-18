'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {

    static associate(models) {
      // define association here
    }
  }
  Position.init({
    name: DataTypes.STRING,
    acronym: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Position',
    underscored: true
  });
  return Position;
};