const express = require('express');
const router = express.Router();
const accountingController = require('../controllers/accountingController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protected routes - Admin và Employee có thể truy cập
router.get('/', protect, authorize('admin', 'employee'), accountingController.getAllAccounting);
router.get('/:id', protect, authorize('admin', 'employee'), accountingController.getAccountingById);
router.post('/', protect, authorize('admin', 'employee'), accountingController.createAccounting);
router.put('/:id', protect, authorize('admin', 'employee'), accountingController.updateAccounting);
router.delete('/:id', protect, authorize('admin'), accountingController.deleteAccounting);

// Summary and statistics - Admin và Employee có thể xem
router.get('/month/:month', protect, authorize('admin', 'employee'), accountingController.getAccountingSummaryByMonth);
router.get('/stats/all', protect, authorize('admin', 'employee'), accountingController.getAccountingStatistics);

module.exports = router;
