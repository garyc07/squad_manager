'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competition extends Model {

    static associate(models) {
      this.hasMany(models.Match)
    }
  }
  Competition.init({
    name: DataTypes.STRING,
    competitive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Competition',
    underscored: true
  });
  return Competition;
};