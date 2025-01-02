const db = require("../../config/database");

class Vendor {
  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM vendor WHERE email = ?", [
      email,
    ]);

    return rows[0];
  }

  static async create(email, password) {
    const [result] = await db.execute(
      "INSERT INTO vendor (email, password) VALUES (?, ?)",
      [email, password]
    );
    return result.insertId;
  }

  static async updateOTP(userId, otp) {
    await db.execute("UPDATE vendor SET otp = ? WHERE id = ?", [otp, userId]);
  }

  static async verifyOTP(userId, otp) {
    const [rows] = await db.execute(
      "SELECT * FROM vendor WHERE id = ? AND otp = ?",
      [userId, otp]
    );
    return rows[0];
  }
  static async getAllVendor() {
    const [rows] = await db.execute("SELECT * FROM vendor");
    return rows;
  }
  static async createNewVendor(name, email, password, venue, type) {
    const [result] = await db.execute(
      "INSERT INTO vendor (name, email, password, venue, type) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, venue, type]
    );
    return result.insertId;
  }
  static async getVendorById(user_id) {
    const [rows] = await db.execute("SELECT * FROM vendor WHERE id = ?", [
      user_id,
    ]);
    return rows[0];
  }
  static  async editVendor(id, name, email, password, type, venue) {
    const [result] = await db.execute(
      "UPDATE vendor SET name = ?, email = ?, password = ?, type = ?, venue = ? WHERE id = ?",
      [name, email, password, type, venue, id]
    );
    return result.affectedRows;
  }
  static async deleteVendor(id){
    const [result] = await db.execute("UPDATE vendor SET is_deleted = 1 WHERE id = ?", [id]);
    return result.affectedRows;
  }

  static async getAllLabreports(){
    const [rows] = await db.execute("SELECT * FROM lab_report");
    console.log(rows);
    return rows;
  }
}

module.exports = Vendor;
