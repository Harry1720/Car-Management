const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protected routes - Admin và Employee có thể xem dashboard
router.get('/stats', protect, authorize('admin', 'employee'), dashboardController.getDashboardStats);
router.get('/revenue/monthly', protect, authorize('admin', 'employee'), dashboardController.getMonthlyRevenue);
router.get('/cars/top-selling', protect, authorize('admin', 'employee'), dashboardController.getTopSellingCars);
router.get('/deposits/statistics', protect, authorize('admin', 'employee'), dashboardController.getDepositStatistics);
router.get('/transactions/statistics', protect, authorize('admin', 'employee'), dashboardController.getTransactionStatistics);
router.get('/transactions/recent', protect, authorize('admin', 'employee'), dashboardController.getRecentTransactions);
router.get('/inventory/status', protect, authorize('admin', 'employee'), dashboardController.getCarInventoryStatus);
router.get('/inventory/low-stock', protect, authorize('admin', 'employee'), dashboardController.getLowStockCars);

module.exports = router;
