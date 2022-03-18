'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('player_matches', {
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
      match_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      goals_scored: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      assists: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      clean_sheet: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      mom: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      started: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      on_as_sub: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      unused_sub: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      mins_played: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        max: 90,
        min: 0
      },
      manager_player_rating: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 6.5,
        max: 10.0,
        min: 3.0
      },
      paid_match_fee: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('player_matches');
  }
};