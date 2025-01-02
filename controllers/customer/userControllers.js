const multer = require("multer");
const path = require("path");
const db = require("../../config/database");
const { response } = require("express");
const User = require("../../models/User/user");
// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage });

// Controller function to handle file upload and database entry
const uploadUserImage = (req, res) => {
  const uploadSingle = upload.single("image"); // 'image' is the field name
  const { email } = req.userData;
  uploadSingle(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }

    const {
      firstname,
      lastname,
      date_of_birth,
      gender,
      phone_no,
      address,
      city,
      zipcode,
    } = req.body;
    const imagePath = req.file.path;
    console.log(imagePath);
    // Insert user data into the database
    const sql =
      "INSERT INTO personal_details (image, firstname, lastname, date_of_birth, gender, email, phone_no, address, city, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      imagePath,
      firstname,
      lastname,
      date_of_birth,
      gender,
      email,
      phone_no,
      address,
      city,
      zipcode,
    ];

    db.query(sql, values, (err, results) => {
      console.log(sql);
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Failed to insert user data", error: err });
      }
      res
        .status(200)
        .json({ message: "User data and image uploaded successfully!" });
    });
  });
};

const getUserDataByEmail = async (req, res) => {
  const { userId } = req.userData; // Get email from req.userData
  //   console.log("Fetching data for userId:", userId);
  try {
    const [results] = await db.execute(
      "SELECT * FROM personal_details WHERE user_id = ?",
      [userId]
    );
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      response: {
        response: true,
        error_msg: "",
        success_msg: "",
        data: results,
      },
    }); // Return the first (and only) result
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      response: {
        response: false,
        error_msg: err,
        success_msg: "",
        data: err,
      },
    });
  }
};
const sugarLevelDetails = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { disease_id, before_meal, after_meal, date, time } = req.body;
    const result = await User.insertSugarLevel(
      userId,
      disease_id,
      before_meal,
      after_meal,
      date,
      time
    );
    res.status(200).json({
      response: {
        response: true,
        error_msg: "",
        success_msg: "Sugar Level inserted successfully",
        data: result,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      response: {
        response: false,
        error_msg: "Internal Server Error",
        success_msg: "",
        data: error,
      },
    });
  }
};
const graphDataStore = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { disease_id, x_axis, y_axis } = req.body;
    
    // Get sugar data
    const result = await User.getSugardata(userId, disease_id);
    
    const beforeMealArray = [];
    const afterMealArray = [];
    
    // Convert x_axis and y_axis to JSON strings
    const xAxis = JSON.stringify(x_axis);
    const yAxis = JSON.stringify(y_axis);
    
    // Loop through the data and extract before_meal and after_meal values
    result.forEach((record) => {
      beforeMealArray.push(record.before_meal);
      afterMealArray.push(record.after_meal);
    });

    const data = {
      beforeMealData: beforeMealArray,
      afterMealArray: afterMealArray,
    };
    
    // Convert data to JSON string
    const mealdata = JSON.stringify(data);

    // Store the graph data
    await User.storeGraphData(userId, disease_id, xAxis, yAxis, mealdata);

    // Send success response
    res.status(200).json({
      response: {
        response: true,
        error_msg: "",
        success_msg: "Data inserted successfully",
        data: "",
      },
    });
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({
      response: {
        response: false,
        error_msg: "An error occurred while fetching graph data.",
        success_msg: "",
        data: error.message || error,
      },
    });
  }
};
const graphDataView = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { disease_id } = req.body;
    const result = await User.getGraphData(userId, disease_id);
    if (result.length === 0) {
      return res.status(404).json({
        response: {
          response: false,
          error_msg: "No data found",
          success_msg: "",
          data: "",
        },
      });
    }
    res.status(200).json({
      response: {
        response: true,
        error_msg: "",
        success_msg: "Data fetched successfully",
        data: result,
      },
    });
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({
      response: {
        response: false,
        error_msg: "An error occurred while fetching graph data.",
        success_msg: "",
        data: error.message || error,
      },
    });
  }
}

module.exports = {
  uploadUserImage,
  getUserDataByEmail,
  sugarLevelDetails,
  graphDataView,
  graphDataStore
};
