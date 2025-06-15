const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.delete('/account', UserController.deleteAccount);
router.get('/dashboard', UserController.getDashboard);

module.exports = router;