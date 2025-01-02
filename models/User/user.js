const db = require("../../config/database");

class User {
  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  // static async create(email, password) {
  //   const [result] = await db.execute(
  //     "INSERT INTO user (email, password) VALUES (?, ?)",
  //     [email, password]
  //   );
  //   return result.insertId;
  // }

  static async updateOTP(userId, otp) {
    await db.execute("UPDATE user SET otp = ? WHERE id = ?", [otp, userId]);
  }

  static async verifyOTP(userId, otp) {
    const [rows] = await db.execute(
      "SELECT * FROM user WHERE id = ? AND otp = ?",
      [userId, otp]
    );
    return rows[0];
  }

  static async getAllUsers() {
    const [rows] = await db.execute("SELECT * FROM user");
    return rows;
  }

  static async createNewUser(name, email, password) {
    const [result] = await db.execute(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return result.insertId;
  }

  static async getUserById(user_id) {
    const [rows] = await db.execute("SELECT * FROM user WHERE id = ?", [
      user_id,
    ]);
    return rows[0];
  }

  static async editUser(id, name, email, password) {
    // Replace with your actual database update logic
    const [result] = await db.execute(
      "UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id]
    );
    return result.affectedRows;
  }

  static async deleteUser(id) {
    const [result] = await db.execute(
      "UPDATE user SET is_deleted = 1 WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }

  static async insertSugarLevel(
    userId,
    disease_id,
    before_meal,
    after_meal,
    date,
    time
  ) {
    const [result] = await db.execute(
      "INSERT INTO sugar_level (customer_id, disease_id, before_meal, after_meal, date,time) VALUES (?, ?, ?, ?, ?,?)",
      [userId, disease_id, before_meal, after_meal, date, time]
    );
    return result.insertId;
  }
  static async getSugardata(user_id, disease_id) {
    const [rows] = await db.execute(
      "SELECT * FROM sugar_level WHERE customer_id = ? AND disease_id = ? ORDER BY id DESC LIMIT 7;",
      [user_id, disease_id]
    );
    // console.log(rows);
    return rows;
  }
  static async storeGraphData(user_id, disease_id, xAxis, yAxis, mealdata) {
      const [result] = await db.execute(
        "INSERT INTO graph (user_id, diease_id, x_axis, y_axis, graphdata) VALUES (?, ?, ?, ?, ?)",
        [user_id, disease_id, xAxis, yAxis, mealdata]
      );
  
    return result.insertId;
  }
  static async getGraphData(user_id, disease_id) {
    const [rows] = await db.execute(
      "SELECT * FROM graph WHERE user_id = ? AND diease_id = ?",
      [user_id, disease_id]
    );
    return rows;
  }
}

module.exports = User;
