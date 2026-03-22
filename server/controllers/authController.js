const pool = require('../db/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registro = async (req, res) => {
  const { nombre, email, password, carrera } = req.body;

  if (!nombre || !email || !password || !carrera) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
  }

  try {
    const [existe] = await pool.query('SELECT id FROM estudiantes WHERE email = ?', [email]);

    if (existe.length > 0) {
      return res.status(409).json({ mensaje: 'El email ya está registrado.' });
    }

    const hash = await bcrypt.hash(password, 10);

    const [resultado] = await pool.query(
      'INSERT INTO estudiantes (nombre, email, password, carrera) VALUES (?, ?, ?, ?)',
      [nombre, email, hash, carrera]
    );

    res.status(201).json({ mensaje: 'Estudiante registrado correctamente.', id: resultado.insertId });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM estudiantes WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas.' });
    }

    const estudiante = rows[0];
    const passwordValida = await bcrypt.compare(password, estudiante.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas.' });
    }

    const token = jwt.sign(
      { id: estudiante.id, nombre: estudiante.nombre, email: estudiante.email, carrera: estudiante.carrera },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ mensaje: 'Login exitoso.', token, estudiante: { id: estudiante.id, nombre: estudiante.nombre, email: estudiante.email, carrera: estudiante.carrera } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

module.exports = { registro, login };
