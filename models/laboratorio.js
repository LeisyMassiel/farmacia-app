'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Laboratorio extends Model {
    static associate(models) {
      Laboratorio.hasMany(models.OrdenCompra, { foreignKey: 'CodLab' });
    }
  }

  Laboratorio.init({
    CodLab: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    razonSocial: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    contacto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Laboratorio'
  });

  return Laboratorio;
};