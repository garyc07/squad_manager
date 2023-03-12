const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {

    static associate(models) {
      this.belongsToMany(models.Match, { through: models.PlayerMatch })
      this.belongsToMany(models.TrainingSession, { through: models.PlayerSession })
      this.belongsToMany(models.Squad, { through: models.PlayerSquad })
    }
  }
  Player.init({
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    ph_number: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Player',
    underscored: true
  })

  return Player
}