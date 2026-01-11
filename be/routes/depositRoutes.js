const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public routes - cho phép đặt cọc không cần đăng nhập
router.post('/', depositController.createDeposit);

// Protected routes - Admin và Employee có thể xem
router.get('/', protect, authorize('admin', 'employee'), depositController.getAllDeposits);
router.get('/:id', protect, authorize('admin', 'employee'), depositController.getDepositById);
router.put('/:id', protect, authorize('admin'), depositController.updateDeposit);
router.delete('/:id', protect, authorize('admin'), depositController.deleteDeposit);

// Customer deposits
router.get('/customer/:customerId', protect, depositController.getDepositsByCustomer);

module.exports = router;
