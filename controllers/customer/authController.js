const jwt = require("jsonwebtoken");
const User = require("../../models/User/user");
const emailService = require("../../utils/emailService");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //   console.log(email," ",password)
    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findByEmail(email);
    //   console.log("User",user)
    const otp = Math.floor(100000 + Math.random() * 900000);

    await User.updateOTP(user.id, otp);
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
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verifiedUser = await User.verifyOTP(user.id, otp);

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
