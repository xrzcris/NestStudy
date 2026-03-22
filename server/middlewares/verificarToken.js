const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token requerido.' });
  }

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    req.estudiante = datos;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token invalido o expirado.' });
  }
};

module.exports = verificarToken;
