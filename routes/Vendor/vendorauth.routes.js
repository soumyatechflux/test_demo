const express = require("express");
const router = express.Router();
// const authController = require('../controllers/customer/authController');
const authController = require("../../controllers/vendor/vendorauthController");

router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOTP);

module.exports = router;
