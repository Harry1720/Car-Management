const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protected routes
router.get('/', protect, customerController.getAllCustomers);
router.get('/:id', protect, customerController.getCustomerById);
router.post('/', protect, customerController.createCustomer);
router.put('/:id', protect, authorize('admin'), customerController.updateCustomer);
router.delete('/:id', protect, authorize('admin'), customerController.deleteCustomer);

// Car interest routes
router.post('/:customerId/cars/:carId', protect, customerController.addCarInterest);
router.delete('/:customerId/cars/:carId', protect, customerController.removeCarInterest);

module.exports = router;
