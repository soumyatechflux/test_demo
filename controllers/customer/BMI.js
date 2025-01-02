const BMIdata = require("../../models/User/bmidata");

exports.addBMI = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { height, weight, age } = req.body;
    if (!height || !weight) {
      return res
        .status(400)
        .json({ message: "Height and weight are required" });
    }
    const heightInMeters = height / 100; // convert height to meters if provided in cm
    const bmi = weight / (heightInMeters * heightInMeters);
    await BMIdata.create(weight, height, age, bmi.toFixed(2), userId);
    res.status(200).json({ message: "Data Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBMI = async (req, res) => {
  try {
    const { userId } = req.userData;
    const data = await BMIdata.getBMIData(userId);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
