'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Medicamento extends Model {
    static associate(models) {
      Medicamento.hasMany(models.DetalleOrdenCompra, { foreignKey: 'CodMedicamento' });
    }
  }

  Medicamento.init({
    CodMedicamento: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    descripcionMed: DataTypes.STRING,
    fechaFabricacion: DataTypes.DATE,
    fechaVencimiento: DataTypes.DATE,
    Presentacion: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    precioVentaUni: DataTypes.DECIMAL(10, 2),
    precioVentaPres: DataTypes.DECIMAL(10, 2),
    Marca: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medicamento'
  });

  return Medicamento;
};