'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SessionPlan extends Model {

    static associate(models) {
      this.hasMany(models.TrainingSession)
    }
  }
  SessionPlan.init({
    theme: DataTypes.STRING,
    coach_notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'SessionPlan',
    underscored: true
  });
  return SessionPlan;
};