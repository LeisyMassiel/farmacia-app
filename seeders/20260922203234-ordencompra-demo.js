'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('OrdenCompras', [
      {
        NroOrdenC: 1,
        fechaEmision: new Date('2026-09-22'),
        Situacion: 'Registrada',
        Total: 250.00,
        CodLab: 1,
        NrofacturaProv: 'F001-0001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        NroOrdenC: 2,
        fechaEmision: new Date('2026-09-22'),
        Situacion: 'Pendiente',
        Total: 180.00,
        CodLab: 2,
        NrofacturaProv: 'F001-0002',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('OrdenCompras', null, {});
  }
};