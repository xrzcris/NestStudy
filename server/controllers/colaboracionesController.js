const pool = require('../db/connection');

const listarColaboraciones = async (req, res) => {
  const { id } = req.params;
  try {
    const [proyectoExiste] = await pool.query('SELECT id FROM proyectos WHERE id = ?', [id]);
    if (proyectoExiste.length === 0) return res.status(404).json({ mensaje: 'Proyecto no encontrado.' });
    const [colaboraciones] = await pool.query(
      `SELECT c.id, c.contenido, c.creado_en, e.nombre AS autor
       FROM colaboraciones c JOIN estudiantes e ON c.estudiante_id = e.id
       WHERE c.proyecto_id = ? ORDER BY c.creado_en ASC`, [id]);
    res.json(colaboraciones);
  } catch (error) {
    console.error('Error al listar colaboraciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

const agregarColaboracion = async (req, res) => {
  const { id } = req.params;
  const { contenido } = req.body;
  const estudiante_id = req.estudiante.id;
  if (!contenido) return res.status(400).json({ mensaje: 'El contenido es obligatorio.' });
  try {
    const [proyectoExiste] = await pool.query('SELECT id FROM proyectos WHERE id = ?', [id]);
    if (proyectoExiste.length === 0) return res.status(404).json({ mensaje: 'Proyecto no encontrado.' });
    const [resultado] = await pool.query(
      'INSERT INTO colaboraciones (contenido, proyecto_id, estudiante_id) VALUES (?, ?, ?)',
      [contenido, id, estudiante_id]);
    res.status(201).json({ mensaje: 'Colaboración agregada correctamente.', id: resultado.insertId });
  } catch (error) {
    console.error('Error al agregar colaboración:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

const eliminarColaboracion = async (req, res) => {
  const { id } = req.params;
  const estudiante_id = req.estudiante.id;
  try {
    const [rows] = await pool.query('SELECT estudiante_id FROM colaboraciones WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Colaboración no encontrada.' });
    if (rows[0].estudiante_id !== estudiante_id) return res.status(403).json({ mensaje: 'No tienes permiso.' });
    await pool.query('DELETE FROM colaboraciones WHERE id = ?', [id]);
    res.json({ mensaje: 'Colaboración eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar colaboración:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

module.exports = { listarColaboraciones, agregarColaboracion, eliminarColaboracion };
