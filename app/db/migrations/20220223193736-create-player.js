'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      position: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isIn: [['Gk', 'Def', 'Mid', 'Att']]
        }
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      ph_number: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('players');
  }
};