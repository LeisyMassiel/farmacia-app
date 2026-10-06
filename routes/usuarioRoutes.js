const express = require('express');
const { Usuario } = require('../models');

const router = express.Router();

// Listar usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: [
        'id',
        'nombre',
        'email',
        'rol',
        'createdAt'
      ],
      order: [['id', 'ASC']]
    });

    res.render('usuarios', {
      usuarios,
      usuarioActual: req.usuario
    });

  } catch (error) {
    res.status(500).send(
      'Error al listar usuarios: ' + error.message
    );
  }
});

module.exports = router;