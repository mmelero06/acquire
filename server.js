// server.js
// Entry point del servicio ACQUIRE

const express = require('express');
const cors = require('cors');
const acquireRoutes = require('./routes/acquireRoutes');
const { connectDB } = require('./config/database');
const { PORT } = require('./config/config');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas del servicio ACQUIRE
app.use('/', acquireRoutes);

// Arranque del servidor
app.listen(PORT, async () => {
  console.log(`[ACQUIRE] Servicio escuchando en http://localhost:${PORT}`);

  try {
    // Conectar a MongoDB
    await connectDB();
  } catch (err) {
    console.error('Error al inicializar:', err);
    process.exit(1);
  }
});


