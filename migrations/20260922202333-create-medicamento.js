'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicamentos', {
      CodMedicamento: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      descripcionMed: { type: Sequelize.STRING },
      fechaFabricacion: { type: Sequelize.DATE },
      fechaVencimiento: { type: Sequelize.DATE },
      Presentacion: { type: Sequelize.STRING },
      stock: { type: Sequelize.INTEGER },
      precioVentaUni: { type: Sequelize.DECIMAL(10, 2) },
      precioVentaPres: { type: Sequelize.DECIMAL(10, 2) },
      Marca: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Medicamentos');
  }
};