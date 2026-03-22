const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const { listarProyectos, obtenerProyecto, crearProyecto, eliminarProyecto } = require('../controllers/proyectosController');
const { listarColaboraciones, agregarColaboracion } = require('../controllers/colaboracionesController');

router.get('/', listarProyectos);
router.get('/:id', obtenerProyecto);
router.post('/', verificarToken, crearProyecto);
router.delete('/:id', verificarToken, eliminarProyecto);
router.get('/:id/colaboraciones', listarColaboraciones);
router.post('/:id/colaboraciones', verificarToken, agregarColaboracion);

module.exports = router;
