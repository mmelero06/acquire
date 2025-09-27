// controllers/acquireController.js
const Data = require('../models/Data');

function health(req, res) {
  res.json({
    status: 'ok',
    service: 'acquire'
  });
}

async function saveData(req, res) {
  try {
    const { data, source } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Missing data field' });
    }

    const newData = new Data({
      data,
      source: source || 'unknown'
    });

    const saved = await newData.save();

    res.status(201).json({
      dataId: saved._id,
      timestamp: saved.timestamp,
      message: 'Data saved successfully'
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

module.exports = {
  health,
  saveData,
  getAllData,
  getDataById
};
