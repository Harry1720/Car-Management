const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.get('/category/:category', carController.getCarsByCategory);

// Admin routes
router.post('/', protect, authorize('admin'), carController.createCar);
router.put('/:id', protect, authorize('admin'), carController.updateCar);
router.delete('/:id', protect, authorize('admin'), carController.deleteCar);

module.exports = router;
