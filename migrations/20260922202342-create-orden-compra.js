'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrdenCompras', {
      NroOrdenC: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      fechaEmision: { type: Sequelize.DATE },
      Situacion: { type: Sequelize.STRING },
      Total: { type: Sequelize.DECIMAL(10, 2) },
      CodLab: {
        type: Sequelize.INTEGER,
        references: { model: 'Laboratorios', key: 'CodLab' }
      },
      NrofacturaProv: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('OrdenCompras');
  }
};