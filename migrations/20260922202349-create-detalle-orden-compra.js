'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleOrdenCompras', {
      NroOrdenC: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'OrdenCompras', key: 'NroOrdenC' }
      },
      CodMedicamento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Medicamentos', key: 'CodMedicamento' }
      },
      descripcion: { type: Sequelize.STRING },
      cantidad: { type: Sequelize.INTEGER },
      precio: { type: Sequelize.DECIMAL(10, 2) },
      montouni: { type: Sequelize.DECIMAL(10, 2) },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('DetalleOrdenCompras');
  }
};