const db = require('../../config/database');

class Admin {
  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM admin WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(email, password) {
    const [result] = await db.execute('INSERT INTO admin (email, password) VALUES (?, ?)', [email, password]);
    return result.insertId;
  }

  static async updateOTP(userId, otp) {
    await db.execute('UPDATE admin SET otp = ? WHERE id = ?', [otp, userId]);
  }

  static async verifyOTP(userId, otp) {
    const [rows] = await db.execute('SELECT * FROM admin WHERE id = ? AND otp = ?', [userId, otp]);
    return rows[0];
  }
}

module.exports = Admin;