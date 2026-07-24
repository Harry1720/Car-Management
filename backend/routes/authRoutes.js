const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { upload } = require('../config/cloudinary');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Protected routes
router.get('/me', protect, authController.getCurrentUser);
router.put('/update', protect, upload.single('avatar'), authController.updateUser);
router.put('/change-password', protect, authController.changePassword);
router.post('/interest/toggle/:carId', protect, authController.toggleCarInterest);

module.exports = router;
