const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protected routes
router.get('/stats', protect, authorize('admin'), dashboardController.getDashboardStats);
router.get('/revenue/monthly', protect, authorize('admin'), dashboardController.getMonthlyRevenue);
router.get('/cars/top-selling', protect, authorize('admin'), dashboardController.getTopSellingCars);
router.get('/deposits/statistics', protect, authorize('admin'), dashboardController.getDepositStatistics);
router.get('/transactions/statistics', protect, authorize('admin'), dashboardController.getTransactionStatistics);
router.get('/transactions/recent', protect, authorize('admin'), dashboardController.getRecentTransactions);
router.get('/inventory/status', protect, authorize('admin'), dashboardController.getCarInventoryStatus);

module.exports = router;
