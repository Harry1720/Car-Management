const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// Public routes
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.get('/category/:category', carController.getCarsByCategory);

// Admin and Employee routes - Allow upload of maximum 5 images
router.post('/', protect, authorize('admin', 'employee'), upload.array('images', 5), carController.createCar);
router.put('/:id', protect, authorize('admin', 'employee'), upload.array('images', 5), carController.updateCar);
router.delete('/:id', protect, authorize('admin'), carController.deleteCar);

module.exports = router;
