const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public routes - cho phép đặt cọc không cần đăng nhập
router.post('/', customerController.createCustomer);

// Protected routes - Admin và Employee có thể xem
router.get('/', protect, authorize('admin', 'employee'), customerController.getAllCustomers);
router.get('/:id', protect, authorize('admin', 'employee'), customerController.getCustomerById);
router.put('/:id', protect, authorize('admin'), customerController.updateCustomer);
router.delete('/:id', protect, authorize('admin'), customerController.deleteCustomer);

// Car interest routes
router.post('/:customerId/cars/:carId', protect, customerController.addCarInterest);
router.delete('/:customerId/cars/:carId', protect, customerController.removeCarInterest);

// Update transaction counts - Admin only
router.post('/update-transaction-counts', protect, authorize('admin'), customerController.updateTransactionCounts);

module.exports = router;
