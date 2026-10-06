'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laboratorios', {
      CodLab: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      razonSocial: { type: Sequelize.STRING },
      direccion: { type: Sequelize.STRING },
      telefono: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      contacto: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Laboratorios');
  }
};