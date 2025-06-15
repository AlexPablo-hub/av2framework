const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', TaskController.getTasks);
router.get('/statistics', TaskController.getStatistics);
router.get('/:id', TaskController.getTask);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.patch('/:id/toggle', TaskController.toggleTaskComplete);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;