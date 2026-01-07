const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protected routes
router.get('/', protect, transactionController.getAllTransactions);
router.get('/:id', protect, transactionController.getTransactionById);
router.post('/', protect, transactionController.createTransaction);
router.put('/:id', protect, authorize('admin'), transactionController.updateTransaction);
router.delete('/:id', protect, authorize('admin'), transactionController.deleteTransaction);

// Customer transactions
router.get('/customer/:customerId', protect, transactionController.getTransactionsByCustomer);

// Update transaction status
router.patch('/:id/status', protect, authorize('admin'), transactionController.updateTransactionStatus);

module.exports = router;
