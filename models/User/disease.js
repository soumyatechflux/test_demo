const db = require("../../config/database");

class Disease {
  static async getAllDisease() {
    const [rows] = await db.execute("SELECT * FROM diease");
    return rows;
  }

  static async getLinkData(userId, diseaseId) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM customer_record_diease WHERE diease_id = ? AND user_id = ? AND is_selected = ?",
        [diseaseId, userId, 1]
      );
      return rows.length > 0;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  static async updateLinkData(userId, diseaseId, isSelected) {
    try {
      if (isSelected === 0 || isSelected === null) {
        await db.execute(
          "INSERT INTO customer_record_diease (user_id, diease_id, is_selected) VALUES (?, ?, ?)",
          [userId, diseaseId, 1]
        );
      } else {
        await db.execute(
          //   "DELETE FROM customer_record_diease WHERE user_id = ? AND diease_id = ?",
          //   [userId, diease_id]
          //
          "UPDATE customer_record_diease SET is_selected = ? WHERE user_id = ? AND diease_id = ?",
          [0, userId, diseaseId]
        );
      }
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }
  static async getdiseaseCount(diseaseId) {
    try {
      const [rows] = await db.execute(
        `SELECT COUNT(DISTINCT crd.user_id) AS user_count
            FROM diease d
            JOIN customer_record_diease crd ON d.id = crd.diease_id
            WHERE crd.is_selected = 1 AND d.id = ?
            GROUP BY d.id, d.name`,
        [diseaseId]
      );
      const count = rows.length > 0 ? rows[0].user_count : 0;
      return count;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  static async getAlluserCount() {
    try {
      const [rows] = await db.execute(
        "SELECT COUNT(*) AS user_count FROM user"
      );
      const count = rows.length > 0 ? rows[0].user_count : 0;
      return count;
    } catch (error) {
      console.error("Error executing query:", error);
    }
  }
}
module.exports = Disease;
