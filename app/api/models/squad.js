const { QueryTypes } = require('@sequelize/core')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Squad extends Model {
    
    static associate(models) {
      this.belongsToMany(models.Player, { through: models.PlayerSquad })
      this.hasMany(models.Match)
      this.hasMany(models.TrainingSession)
    }


    static async currentSquad(currentUser) {
      const squad = await this.findByPk(currentUser.primary_squad_id)
      return squad
    }

  }
  Squad.init({
    name: DataTypes.STRING,
    current_season_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Squad',
    underscored: true
  })
  return Squad
}