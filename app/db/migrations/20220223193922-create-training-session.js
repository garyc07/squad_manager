'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('training_sessions', {
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
      session_plan_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      date_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      duration_mins: {
        type: Sequelize.INTEGER
      },
      has_session_fee: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      manager_notes: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('training_sessions');
  }
};