const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Todo funcionando corretamente!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

module.exports = router;