const express = require("express");
const router = express.Router();
const vendorNonAuth = require("../../controllers/vendor/vendornonAuthControllers")
// const authController = require('../controllers/customer/authController');

router.get("/labreport",vendorNonAuth.getAllLabreports)

module.exports = router;
