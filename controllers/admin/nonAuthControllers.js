const User = require("../../models/User/user");
const Vendor = require("../../models/Vendor/Vendor");

exports.addVendor = async (req, res) => {
  // Add vendor
  try {
    const { name, email, password, type, venue } = req.body;
    if (!name || !email || !password || !venue || !type) {
      return res
        .status(400)
        .json({ message: "Name, email, password,type and venue are required" });
    }
    const vendor = await Vendor.findByEmail(email);
    if (vendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    }
    await Vendor.createNewVendor(name, email, password, venue, type);
    res.status(200).json({ message: "Vendor added successfully" });
  } catch {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.addUsers = async (req, res) => {
  // Add users
  try {
    const { email, password, name } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, password and type are required" });
    }
    const user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    await User.createNewUser(name, email, password);
    res.status(200).json({ message: "User added successfully" });
  } catch {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.editVendors = async (req, res) => {
  // Edit vendors
  try {
    const { email, password, name, id, type, venue } = req.body;
    if (!name || !email || !password || !id || !type || !venue) {
      return res.status(400).json({
        message: "Name, email, password, id, type and venue are required",
      });
    }

    const vendor = await Vendor.findByEmail(email);
    if (vendor && vendor.id != id) {
      // Ensure the email is not used by another vendor
      return res
        .status(400)
        .json({ message: "Email already in use by another vendor" });
    }
    1;
    const updatedRows = await Vendor.editVendor(
      id,
      name,
      email,
      password,
      type,
      venue
    );
    if (updatedRows) {
      return res.status(200).json({ message: "Vendor updated successfully" });
    } else {
      return res.status(404).json({ message: "Vendor not updated" });
    }
  } catch (error) {
    console.error("Error editing vendor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editUsers = async (req, res) => {
  // Edit users
  try {
    const { email, password, name, id } = req.body;
    if (!name || !email || !password || !id) {
      return res
        .status(400)
        .json({ message: "Name, email, password, and id are required" });
    }

    const user = await User.findByEmail(email);
    if (user && user.id !== id) {
      // Ensure the email is not used by another user
      return res
        .status(400)
        .json({ message: "Email already in use by another user" });
    }

    const updatedRows = await User.editUser(id, name, email, password);
    if (updatedRows) {
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error editing user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getAllVendors = async (req, res) => {
  // Get all vendors
  try {
    const vendors = await Vendor.getAllVendor();
    res.status(200).json({
      response: {
        response: true,
        error_msg: "",
        success_msg: "",
        data: vendors,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllUsers = async (req, res) => {
  // Get all users\
  try {
    const users = await User.getAllUsers();
    res.status(200).json({
      response: {
        response: true,
        error_msg: "",
        success_msg: "",
        data: users,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.setIsActiveVendors = async (req, res) => {
  // Set is active vendors
};
exports.setIsActiveUsers = async (req, res) => {
  // Set is active vendors
};
exports.deleteVendors = async (req, res) => {
  // Delete vendors
  try {
    const { id } = req.body;
    const vendor = await Vendor.getVendorById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    const deletedRows = await Vendor.deleteVendor(id);
    if (deletedRows) {
      return res.status(200).json({ message: "Vendor deleted successfully" });
    } else {
      return res.status(404).json({ message: "Vendor not deleted" });
    }
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteUsers = async (req, res) => {
  // Delete users
  try {
    const { id } = req.body;
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedRows = await User.deleteUser(id);
    if (deletedRows) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not deleted" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getBills = async (req, res) => {
  // Get bills
};
exports.getUserByID = async (req, res) => {
  // Get user by ID
  try {
    const { id } = req.body;
    const user = await User.getUserById(id);
    res.status(200).json({
      response: {
        response: true,
        error_msg: "",
        success_msg: "",
        data: user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getVendorByID = async (req, res) => {
  // Get vendor by ID
  try {
    const { id } = req.body;
    const vendor = await Vendor.getVendorById(id);
    res.status(200).json({
      response: {
        response: true,
        error_msg: "",
        success_msg: "",
        data: vendor,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
