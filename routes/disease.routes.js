const express = require("express");
const auth = require("../middleware/auth");
// const { getDiseases } = require("../controllers/DiseaseControllers");
const { getDisease, updateDiseaseSelection, countSelectedDiseases } = require("../controllers/customer/dashboard");
const router = express.Router();

router.get("/getdisease", auth,  getDisease);//dash
router.post("/updatedisease",auth,updateDiseaseSelection)
router.get("/deseasecount",auth,countSelectedDiseases)
module.exports = router;
