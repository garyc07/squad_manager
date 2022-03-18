'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('player_sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      player_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      training_session_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      manager_player_rating: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 6.5,
        max: 10.0,
        min: 3.0
      },
      paid_session_fee: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('player_sessions');
  }
};