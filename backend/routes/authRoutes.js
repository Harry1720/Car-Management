const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', protect, authController.getCurrentUser);
router.put('/update', protect, authController.updateUser);
router.put('/change-password', protect, authController.changePassword);

module.exports = router;
