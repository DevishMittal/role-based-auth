const pool = require("../config/dbConnect");

class User {
  static async create({ username, password, role }) {
    const [result] = await pool.execute(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, password, role]
    );
    return result.insertId; // Returns the new user’s ID
  }

  static async findByUsername(username) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return rows[0]; // Returns the user object or undefined
  }
}

module.exports = User;