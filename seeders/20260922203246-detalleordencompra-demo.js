'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('DetalleOrdenCompras', [
      {
        NroOrdenC: 1,
        CodMedicamento: 1,
        descripcion: 'Compra de Paracetamol',
        cantidad: 10,
        precio: 25.00,
        montouni: 250.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        NroOrdenC: 2,
        CodMedicamento: 2,
        descripcion: 'Compra de Ibuprofeno',
        cantidad: 10,
        precio: 18.00,
        montouni: 180.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('DetalleOrdenCompras', null, {});
  }
};