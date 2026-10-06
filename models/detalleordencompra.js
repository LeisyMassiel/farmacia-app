'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetalleOrdenCompra extends Model {
    static associate(models) {
      DetalleOrdenCompra.belongsTo(models.OrdenCompra, { foreignKey: 'NroOrdenC' });
      DetalleOrdenCompra.belongsTo(models.Medicamento, { foreignKey: 'CodMedicamento' });
    }
  }

  DetalleOrdenCompra.init({
    NroOrdenC: { type: DataTypes.INTEGER, primaryKey: true },
    CodMedicamento: { type: DataTypes.INTEGER, primaryKey: true },
    descripcion: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL(10, 2),
    montouni: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'DetalleOrdenCompra'
  });

  return DetalleOrdenCompra;
};