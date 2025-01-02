const jwt = require("jsonwebtoken");
const emailService = require("../../utils/emailService");
const Admin = require("../../models/Admin/admin");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //   console.log(email," ",password)
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await Admin.findByEmail(email);
    const otp = Math.floor(100000 + Math.random() * 900000);

    await Admin.updateOTP(admin.id, otp);
    await emailService.sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await Admin.findByEmail(email);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const verifiedUser = await Admin.verifyOTP(admin.id, otp);

    if (!verifiedUser) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    const token = jwt.sign(
      { userId: admin.id, email: admin.email },
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
