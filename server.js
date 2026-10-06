const express = require('express');
const path = require('path');
const db = require('./models');

const laboratorioRoutes = require('./routes/laboratorioRoutes');
const ordenCompraRoutes = require('./routes/ordenCompraRoutes');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const cookieParser = require('cookie-parser');
const verificarToken = require('./middleware/authMiddleware');
const permitirRoles = require('./middleware/rolMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Página inicial
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Menú principal protegido
app.get('/menu', verificarToken, (req, res) => {
  res.render('menu', {
    usuario: req.usuario
  });
});

// Cerrar sesión
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

// Laboratorios
app.use(
  '/laboratorios',
  verificarToken,
  permitirRoles(
    'administrador',
    'moderador',
    'usuario'
  ),
  laboratorioRoutes
);

// Órdenes de compra
app.use(
  '/ordenes',
  verificarToken,
  permitirRoles(
    'administrador',
    'moderador'
  ),
  ordenCompraRoutes
);

// Usuarios
app.use(
  '/usuarios',
  verificarToken,
  permitirRoles('administrador'),
  usuarioRoutes
);

// Autenticación
app.use('/auth', authRoutes);

// Conexión a la base de datos
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión a bd_Farmacia correcta');

    return db.sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados correctamente');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error de conexión:', error);
  });