const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public routes - cho phép tạo transaction khi đặt cọc
router.post('/', transactionController.createTransaction);

// Protected routes - Admin và Employee có thể xem
router.get('/', protect, authorize('admin', 'employee'), transactionController.getAllTransactions);
router.get('/:id', protect, authorize('admin', 'employee'), transactionController.getTransactionById);
router.put('/:id', protect, authorize('admin'), transactionController.updateTransaction);
router.delete('/:id', protect, authorize('admin'), transactionController.deleteTransaction);

// Customer transactions
router.get('/customer/:customerId', protect, transactionController.getTransactionsByCustomer);

// Update transaction status
router.patch('/:id/status', protect, authorize('admin'), transactionController.updateTransactionStatus);

module.exports = router;
