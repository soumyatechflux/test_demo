const express = require('express');
const router = express.Router();
const authController = require('../controllers/customer/authController');

router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;