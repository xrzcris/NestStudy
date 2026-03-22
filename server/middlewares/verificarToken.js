const jwt =requiere('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split('')[1];

  if (!token) {
    return res.status(401).json({mensaje: 'Accesso denegado. Token requerido.'}); 
  }

  try {
    const datos = jwt.verify(token,process.env.JWT_SECRET);
    req.estudiante = datos;
    next();
  } catch(error) {
    return res.status(403).json({ mensaje: 'Token Invalido o expirado.'});
  }
};

module.exports = verificarToken;// manejo de token expirado agregado
