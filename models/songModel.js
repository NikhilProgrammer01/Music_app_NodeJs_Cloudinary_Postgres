const pool = require("../config/db");

const getSongsByName = async (name) => {
  console.log("🔍 Searching for songs with name:", name);

  try {
    const query = `
      SELECT * FROM songs 
      WHERE title ILIKE $1
      ORDER BY title ASC
    `;

    const result = await pool.query(query, [`${name}%`]);

    console.log("✅ Query executed successfully, rows returned:", result.rows.length);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    return { success: false, error: "Database query failed" };
  }
};

module.exports = { getSongsByName };
