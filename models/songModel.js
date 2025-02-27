const pool = require("../config/db");


const getAllSongs = async () => {
  try {
    const query = `SELECT * FROM songs ORDER BY title ASC`;
    console.log("📢 Running query:", query);

    const result = await pool.query(query); // ✅ Use pool.query instead of pool.connect
    console.log("✅ Query executed successfully, rows returned:", result.rows.length);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    return { success: false, error: "Database query failed", details: error.message };
  }
};


const getSongsByTitle = async (searchTerm) => {
  try {
    const query = `SELECT * FROM songs WHERE title ILIKE $1 ORDER BY title ASC`;
    console.log("📢 Running query:", query, "with searchTerm:", searchTerm);

    const result = await pool.query(query, [`${searchTerm}%`]); // Search for titles starting with `searchTerm`
    console.log("✅ Query executed successfully, rows returned:", result.rows.length);
    
    return { success: true, data: result.rows };
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    return { success: false, error: "Database query failed", details: error.message };
  }
};



module.exports = { getAllSongs, getSongsByTitle};
