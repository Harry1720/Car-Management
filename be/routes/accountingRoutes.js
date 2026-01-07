const express = require('express');
const router = express.Router();
const accountingController = require('../controllers/accountingController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protected routes
router.get('/', protect, authorize('admin', 'accountant'), accountingController.getAllAccounting);
router.get('/:id', protect, authorize('admin', 'accountant'), accountingController.getAccountingById);
router.post('/', protect, authorize('admin', 'accountant'), accountingController.createAccounting);
router.put('/:id', protect, authorize('admin', 'accountant'), accountingController.updateAccounting);
router.delete('/:id', protect, authorize('admin', 'accountant'), accountingController.deleteAccounting);

// Summary and statistics
router.get('/month/:month', protect, authorize('admin', 'accountant'), accountingController.getAccountingSummaryByMonth);
router.get('/stats/all', protect, authorize('admin', 'accountant'), accountingController.getAccountingStatistics);

module.exports = router;
