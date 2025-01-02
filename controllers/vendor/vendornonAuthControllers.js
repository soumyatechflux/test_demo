const Vendor = require("../../models/Vendor/Vendor");

exports.getVBills = (req, res) => {
  try {
  } catch (error) {}
};
exports.getAllLabreports = async (req, res) => {
  try {
    const labreports = await Vendor.getAllLabreports();
    console.log(labreports);
    res.status(200).json({
      response: {
        response: true,
        error_msg: "",
        success_msg: "",
        data: labreports,
      },
    });
  } catch (error) {
    res.status(200).json({
        response: {
          response: false,
          error_msg: "Not able to fetch Lab reports",
          success_msg: "",
          data: error,
        },
      });
  }
};
