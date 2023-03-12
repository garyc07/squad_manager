const { competition_types, venue_types } = require('../../../CONSTANTS')
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
      competition: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: competition_types
      },
      date_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      opposition: {
        allowNull: false,
        type: Sequelize.STRING
      },
      venue: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: venue_types
      },
      goals_for: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      goals_against: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      manager_notes: {
        type: Sequelize.TEXT
      },
      mom_player_id: {
        type: Sequelize.INTEGER
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
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches')
  }
}