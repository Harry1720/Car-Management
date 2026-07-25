const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public route to submit a consultation request
router.post('/', consultationController.createConsultation);

// Protected routes (Admin and Employee)
router.use(protect);
router.use(authorize('admin', 'employee'));

router.get('/', consultationController.getConsultations);
router.patch('/:id/status', consultationController.updateConsultationStatus);

module.exports = router;
