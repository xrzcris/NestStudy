const pool = require('../db/connection');

const listarProyectos = async (req, res) => {
  const { carrera } = req.query;
  try {
    let query = `SELECT p.id, p.titulo, p.descripcion, p.carrera, p.creado_en,
                 e.nombre AS autor FROM proyectos p JOIN estudiantes e ON p.estudiante_id = e.id`;
    const params = [];
    if (carrera) { query += ' WHERE p.carrera = ?'; params.push(carrera); }
    query += ' ORDER BY p.creado_en DESC';
    const [proyectos] = await pool.query(query, params);
    res.json(proyectos);
  } catch (error) {
    console.error('Error al listar proyectos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.titulo, p.descripcion, p.carrera, p.creado_en,
       e.nombre AS autor, e.id AS autor_id FROM proyectos p
       JOIN estudiantes e ON p.estudiante_id = e.id WHERE p.id = ?`, [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Proyecto no encontrado.' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

const crearProyecto = async (req, res) => {
  const { titulo, descripcion, carrera } = req.body;
  const estudiante_id = req.estudiante.id;
  if (!titulo || !descripcion || !carrera) {
    return res.status(400).json({ mensaje: 'Título, descripción y carrera son obligatorios.' });
  }
  try {
    const [resultado] = await pool.query(
      'INSERT INTO proyectos (titulo, descripcion, carrera, estudiante_id) VALUES (?, ?, ?, ?)',
      [titulo, descripcion, carrera, estudiante_id]);
    res.status(201).json({ mensaje: 'Proyecto publicado correctamente.', id: resultado.insertId });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  const estudiante_id = req.estudiante.id;
  try {
    const [rows] = await pool.query('SELECT estudiante_id FROM proyectos WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Proyecto no encontrado.' });
    if (rows[0].estudiante_id !== estudiante_id) return res.status(403).json({ mensaje: 'No tienes permiso para eliminar este proyecto.' });
    await pool.query('DELETE FROM proyectos WHERE id = ?', [id]);
    res.json({ mensaje: 'Proyecto eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

module.exports = { listarProyectos, obtenerProyecto, crearProyecto, eliminarProyecto };
