const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.get('/category/:category', carController.getCarsByCategory);

// Admin và Employee routes - Cho phép upload tối đa 5 ảnh
router.post('/', protect, authorize('admin', 'employee'), upload.array('images', 5), carController.createCar);
router.put('/:id', protect, authorize('admin', 'employee'), upload.array('images', 5), carController.updateCar);
router.delete('/:id', protect, authorize('admin'), carController.deleteCar);

module.exports = router;
