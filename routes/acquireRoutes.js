// routes/acquireRoutes.js
const express = require('express');
const router = express.Router();

const acquireController = require('../controllers/acquireController');

// Rutas del servicio ACQUIRE
router.get('/health', acquireController.health);
router.post('/acquire', acquireController.saveData);
router.get('/data', acquireController.getAllData);
router.get('/data/:id', acquireController.getDataById);

module.exports = router;
