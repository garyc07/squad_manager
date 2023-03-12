const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TrainingSession extends Model {

    static associate(models) {
      this.belongsTo(models.Squad, { foreignKey: 'squad_id' })
      this.belongsTo(models.Season, { foreignKey: 'season_id' })
      this.belongsToMany(models.Player, { through: models.PlayerSession })
      this.belongsTo(models.SessionPlan, { foreignKey: 'session_plan_id' })
    }
  }
  TrainingSession.init({
    squad_id: DataTypes.INTEGER,
    season_id: DataTypes.INTEGER,
    session_plan_id: DataTypes.INTEGER,
    date_time: DataTypes.DATE,
    location: DataTypes.STRING,
    duration_mins: DataTypes.INTEGER,
    has_session_fee: DataTypes.BOOLEAN,
    manager_notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TrainingSession',
    underscored: true
  })
  return TrainingSession
}