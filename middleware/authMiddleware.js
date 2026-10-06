const jwt = require('jsonwebtoken');

const JWT_SECRET = 'farmacia_jwt_secret_2026';

function verificarToken(req, res, next) {
  let token;

  // Token enviado desde Postman
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // Token almacenado en cookie para el navegador
  if (!token && req.cookies) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      message: 'Token no proporcionado'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.usuario = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido o expirado'
    });
  }
}

module.exports = verificarToken;