// routes/acquireRoutes.js
const express = require('express');
const router = express.Router();

const acquireController = require('../controllers/acquireController');

// Rutas del servicio ACQUIRE
router.get('/health', acquireController.health);
router.post('/data', acquireController.createData);
router.get('/data', acquireController.getAllData);
router.get('/data/:id', acquireController.getDataById);
router.post('/usuarios/registrar', acquireController.registrarUsuario);
router.post('/usuarios/verificar', acquireController.verificarUsuario);

module.exports = router;
