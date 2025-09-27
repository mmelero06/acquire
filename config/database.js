// config/database.js
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[MONGODB] Conexión exitosa a MongoDB');
    
    mongoose.connection.on('error', (err) => {
      console.error('[MONGODB] Error en la conexión:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('[MONGODB] Desconectado de MongoDB');
    });

  } catch (err) {
    console.error('[MONGODB] Error al conectar a MongoDB:', err.message);
    throw err;
  }
}

async function disconnectDB() {
  try {
    await mongoose.connection.close();
    console.log('[MONGODB] Conexión cerrada correctamente');
  } catch (err) {
    console.error('[MONGODB] Error al cerrar la conexión:', err);
  }
}

module.exports = {
  connectDB,
  disconnectDB
};
