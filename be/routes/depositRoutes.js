const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protected routes
router.get('/', protect, depositController.getAllDeposits);
router.get('/:id', protect, depositController.getDepositById);
router.post('/', protect, depositController.createDeposit);
router.put('/:id', protect, authorize('admin'), depositController.updateDeposit);
router.delete('/:id', protect, authorize('admin'), depositController.deleteDeposit);

// Customer deposits
router.get('/customer/:customerId', protect, depositController.getDepositsByCustomer);

module.exports = router;
