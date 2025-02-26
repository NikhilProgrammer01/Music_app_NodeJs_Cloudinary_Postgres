const pool = require("../config/db");

const getSongsByName = async (name) => {
  try {
    console.log("📡 Connecting to database...");
    
    const query = `
      SELECT * FROM songs 
      WHERE title ILIKE $1
      ORDER BY title ASC
    `;

    console.log("📤 Executing query:", query);
    console.log("📝 Query parameters:", [`${name}%`]);

    const result = await pool.query(query, [`${name}%`]);

    console.log(`✅ Query successful! Found ${result.rows.length} results`);
    return result.rows;
  } catch (error) {
    console.error("❌ Database error:", error);
    throw error; // Rethrow error to be handled in the controller
  }
};

module.exports = { getSongsByName };
