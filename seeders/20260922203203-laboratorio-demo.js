'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Laboratorios', [
      {
        CodLab: 1,
        razonSocial: 'Laboratorios Farma Perú',
        direccion: 'Av. América 123',
        telefono: '944111222',
        email: 'contacto@farmaperu.com',
        contacto: 'Carlos Pérez',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CodLab: 2,
        razonSocial: 'Laboratorios Salud Total',
        direccion: 'Av. España 456',
        telefono: '955333444',
        email: 'ventas@saludtotal.com',
        contacto: 'Ana Torres',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Laboratorios', null, {});
  }
};