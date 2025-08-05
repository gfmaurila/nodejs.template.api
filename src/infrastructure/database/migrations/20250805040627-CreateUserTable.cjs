'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TB_USER', {
      Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Senha: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      Notification: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Gender: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TB_USER');
  },
};
