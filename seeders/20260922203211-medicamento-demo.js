'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Medicamentos', [
      {
        CodMedicamento: 1,
        descripcionMed: 'Paracetamol 500mg',
        fechaFabricacion: new Date('2026-01-10'),
        fechaVencimiento: new Date('2028-01-10'),
        Presentacion: 'Caja x 20 tabletas',
        stock: 100,
        precioVentaUni: 1.50,
        precioVentaPres: 25.00,
        Marca: 'FarmaPeru',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CodMedicamento: 2,
        descripcionMed: 'Ibuprofeno 400mg',
        fechaFabricacion: new Date('2026-02-15'),
        fechaVencimiento: new Date('2028-02-15'),
        Presentacion: 'Caja x 10 tabletas',
        stock: 80,
        precioVentaUni: 2.00,
        precioVentaPres: 18.00,
        Marca: 'SaludTotal',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Medicamentos', null, {});
  }
};