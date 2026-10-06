'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrdenCompra extends Model {
    static associate(models) {
      OrdenCompra.belongsTo(models.Laboratorio, { foreignKey: 'CodLab' });
      OrdenCompra.hasMany(models.DetalleOrdenCompra, { foreignKey: 'NroOrdenC' });
    }
  }

  OrdenCompra.init({
    NroOrdenC: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fechaEmision: DataTypes.DATE,
    Situacion: DataTypes.STRING,
    Total: DataTypes.DECIMAL(10, 2),
    CodLab: DataTypes.INTEGER,
    NrofacturaProv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrdenCompra'
  });

  return OrdenCompra;
};