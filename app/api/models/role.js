const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {
      this.belongsToMany(models.User, { through: 'user_roles' })
    }
  }
  Role.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    underscored: true
  })
  return Role
}