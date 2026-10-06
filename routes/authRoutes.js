const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const verificarToken = require('../middleware/authMiddleware');
const permitirRoles = require('../middleware/rolMiddleware');

const router = express.Router();

const JWT_SECRET = 'farmacia_jwt_secret_2026';

// =============================
// FORMULARIO REGISTRO
// =============================
router.get('/registro', (req, res) => {
  res.render('registro');
});

// =============================
// REGISTRO
// =============================
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).send('El correo ya está registrado');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      rol: rol || 'usuario'
    });

    return res.redirect('/auth/login');
  } catch (error) {
    return res.status(500).send(
      'Error al registrar usuario: ' + error.message
    );
  }
});

// =============================
// FORMULARIO LOGIN
// =============================
router.get('/login', (req, res) => {
  res.render('login');
});

// =============================
// LOGIN
// =============================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).send(
        'Correo o contraseña incorrectos'
      );
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).send(
        'Correo o contraseña incorrectos'
      );
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      JWT_SECRET,
      {
        expiresIn: '2h'
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    });

    return res.redirect('/menu');

  } catch (error) {
    return res.status(500).send(
      'Error al iniciar sesión: ' + error.message
    );
  }
});

// =============================
// PERFIL PROTEGIDO
// =============================
router.get('/perfil', verificarToken, (req, res) => {
  res.json({
    message: 'Acceso autorizado',
    usuario: req.usuario
  });
});

// =============================
// SOLO ADMINISTRADOR
// =============================
router.get(
  '/admin',
  verificarToken,
  permitirRoles('administrador'),
  (req, res) => {
    res.json({
      message: 'Acceso permitido al administrador',
      usuario: req.usuario
    });
  }
);

// =============================
// ADMINISTRADOR O MODERADOR
// =============================
router.get(
  '/moderador',
  verificarToken,
  permitirRoles('administrador', 'moderador'),
  (req, res) => {
    res.json({
      message: 'Acceso permitido',
      usuario: req.usuario
    });
  }
);

module.exports = router;