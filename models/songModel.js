const pool = require("../config/db");

const getAllSongs = async () => {
  try {
    const query = "SELECT * FROM songs ORDER BY title ASC";
    console.log("📢 Running query:", query);
    const result = await pool.query(query);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    return { success: false, error: "Database query failed" };
  }
};

const getSongsByTitle = async (title) => {
  try {
    const query = `SELECT * FROM songs WHERE title ILIKE $1 ORDER BY title ASC`;
    console.log("📢 Searching songs with:", title);
    const result = await pool.query(query, [`${title}%`]); // "P%" searches titles starting with P
    return { success: true, data: result.rows };
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    return { success: false, error: "Database query failed" };
  }
};

module.exports = { getAllSongs, getSongsByTitle };
