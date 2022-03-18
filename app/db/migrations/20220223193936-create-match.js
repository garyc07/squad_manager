'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      squad_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      season_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      competition_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      opposition: {
        allowNull: false,
        type: Sequelize.STRING
      },
      at_home: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      goals_for: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      goals_against: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      manager_notes: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};