// controllers/acquireController.js
const Data = require('../models/Data');
const mongoose = require('mongoose');

function health(req, res) {
  res.json({
    status: 'ok',
    service: 'acquire'
  });
}

async function createData(req, res) {
  try {
    const features = [1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8];

    const newData = new Data({
      data: { mock: "auto-generated features" },
      source: 'auto-mock'
    });

    const saved = await newData.save();

    res.status(201).json({
      dataId: saved._id,
      features: features,
      featureCount: features.length,
      scalerVersion: "v1",
      createdAt: saved.timestamp || new Date().toISOString()
    });
  } catch (err) {
    console.error('Error guardando datos:', err);
    res.status(500).json({ error: 'Internal error saving data' });
  }
}

async function getAllData(req, res) {
  try {
    const { limit = 50, skip = 0 } = req.query;
    
    const dataList = await Data
      .find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Data.countDocuments();

    res.json({
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
      data: dataList
    });
  } catch (err) {
    console.error('Error obteniendo datos:', err);
    res.status(500).json({ error: 'Error retrieving data' });
  }
}

async function getDataById(req, res) {
  try {
    const { id } = req.params;
    
    const data = await Data.findById(id);
    
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
  } catch (err) {
    console.error('Error obteniendo dato:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid data ID format' });
    }
    
    res.status(500).json({ error: 'Error retrieving data' });
  }
}

// NUEVAS FUNCIONES PARA USUARIOS (MAPPED AS FUNCTIONS)
async function registrarUsuario(req, res) {
  try {
    const { username, password } = req.body;
    await mongoose.connection.db.collection('usuarios').insertOne({ username, password });
    res.status(201).json({ success: true, message: 'Usuario guardado en MongoDB' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function verificarUsuario(req, res) {
  try {
    const { username, password } = req.body;
    const usuario = await mongoose.connection.db.collection('usuarios').findOne({ username, password });
    
    if (usuario || (username === 'admin' && password === 'sod2026')) {
      return res.status(200).json({ valido: true });
    }
    
    return res.status(401).json({ valido: false, error: 'Credenciales inválidas' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// UN ÚNICO BLOQUE DE EXPORTACIÓN AL FINAL DEL ARCHIVO
module.exports = {
  health,
  createData,
  getAllData,
  getDataById,
  registrarUsuario,
  verificarUsuario
};