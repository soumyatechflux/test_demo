const jwt = require("jsonwebtoken");
// const User = require("../../models/User/user");
const emailService = require("../../utils/emailService");
const Vendor = require("../../models/Vendor/Vendor");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email," ",password)
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await Vendor.findByEmail(email);
    console.log("Vendor", user);
    const otp = Math.floor(100000 + Math.random() * 900000);
    if (user.is_deleted == 0) {
      if (user.is_active == 1) {
        await Vendor.updateOTP(user.id, otp);
        await emailService.sendOTP(email, otp);
        res.status(200).json({ message: "OTP sent to your email" });
      } else {
        res.status(401).json({ message: "Account is not active" });
      }
    } else {
      res.status(401).json({ message: "Account is deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Vendor.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    const verifiedUser = await Vendor.verifyOTP(user.id, otp);
    if (!verifiedUser) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1y",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
