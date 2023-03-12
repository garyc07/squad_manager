const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {

    static associate(models) {
      this.hasMany(models.Match)
      this.hasMany(models.TrainingSession)
      //this.hasOne(models.Squad)
    }
  }
  Season.init({
    year: DataTypes.INTEGER,
    current: DataTypes.BOOLEAN,
    squad_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Season',
    underscored: true
  })
  return Season
}