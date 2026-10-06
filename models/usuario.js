'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Por ahora no necesita relación con otras tablas
    }
  }

  Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      rol: {
        type: DataTypes.ENUM(
          'administrador',
          'moderador',
          'usuario'
        ),
        allowNull: false,
        defaultValue: 'usuario'
      }
    },
    {
      sequelize,
      modelName: 'Usuario'
    }
  );

  return Usuario;
};