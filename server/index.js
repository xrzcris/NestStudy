require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const proyectosRoutes = require('./routes/proyectos');
const colaboracionesRoutes = require('./routes/colaboraciones');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/colaboraciones', colaboracionesRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'Di hola si ves esto.' });
});

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
