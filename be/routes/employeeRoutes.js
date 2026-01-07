const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protected routes
router.get('/', protect, employeeController.getAllEmployees);
router.get('/:id', protect, employeeController.getEmployeeById);
router.post('/', protect, authorize('admin', 'hr'), employeeController.createEmployee);
router.put('/:id', protect, authorize('admin', 'hr'), employeeController.updateEmployee);
router.delete('/:id', protect, authorize('admin', 'hr'), employeeController.deleteEmployee);

// Department and position routes
router.get('/department/:department', protect, employeeController.getEmployeesByDepartment);
router.get('/position/:position', protect, employeeController.getEmployeesByPosition);

module.exports = router;
