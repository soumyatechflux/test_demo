const express = require("express");
const auth = require("../middleware/auth");
const {
  uploadUserImage,
  getUserDataByEmail,
  sugarLevelDetails,
  graphDataView,
  graphDataStore,
} = require("../controllers/customer/userControllers");
const router = express.Router();

router.post("/formdata", auth, uploadUserImage);
router.get("/getformdata", auth, getUserDataByEmail);
router.post("/sugarlevel", auth, sugarLevelDetails);
router.post("/storegraph", auth, graphDataStore);
router.post("/getgraph", auth, graphDataView);
module.exports = router;
