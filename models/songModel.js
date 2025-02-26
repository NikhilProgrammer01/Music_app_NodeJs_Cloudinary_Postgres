const pool = require("../config/db");

const getSongsByName = async (name) => {
  try {
    console.log("🔍 Searching for songs with name:", name);

    const query = `
      SELECT * FROM songs 
      WHERE title ILIKE $1
      ORDER BY title ASC
    `;
    
    const result = await pool.query(query, [`${name}%`]);
    
    console.log("✅ Query executed successfully, rows returned:", result.rows.length);
    return result.rows;
  } catch (error) {
    console.error("❌ Database query error:", error);
    throw error;
  }
};

module.exports = { getSongsByName };
