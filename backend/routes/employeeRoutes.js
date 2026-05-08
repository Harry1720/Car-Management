const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protected routes - Admin và Employee có thể xem
router.get('/', protect, authorize('admin', 'employee'), employeeController.getAllEmployees);
router.get('/:id', protect, authorize('admin', 'employee'), employeeController.getEmployeeById);
router.post('/', protect, authorize('admin'), employeeController.createEmployee);
router.put('/:id', protect, authorize('admin'), employeeController.updateEmployee);
router.delete('/:id', protect, authorize('admin'), employeeController.deleteEmployee);

// Department and position routes - Admin và Employee có thể xem
router.get('/department/:department', protect, authorize('admin', 'employee'), employeeController.getEmployeesByDepartment);
router.get('/position/:position', protect, authorize('admin', 'employee'), employeeController.getEmployeesByPosition);

module.exports = router;
