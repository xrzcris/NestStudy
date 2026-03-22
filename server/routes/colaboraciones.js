const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const { eliminarColaboracion } = require('../controllers/colaboracionesController');

router.delete('/:id', verificarToken, eliminarColaboracion);

module.exports = router;
