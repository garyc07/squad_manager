const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.belongsToMany(models.Role, { through: models.UserRoles })
    }

  }
  User.init({
    primary_squad_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    underscored: true
  })
  return User
}