const pool = require("../config/db");

const getSongsByName = async (name) => {
  console.log("🔍 Searching for songs with name:", name);

  const client = await pool.connect(); // Explicitly connect

  try {
    const query = `
    SELECT * FROM songs
    WHERE title LIKE $1
    ORDER BY title ASC
  `;
  // const result = await pool.query(query, [`${name}%`]);
  
  const result = await client.query(query, [`${name}%`]);
    console.log("📢 Running query:", query, "with param:", `${name}%`);


    console.log("✅ Query executed successfully, rows returned:", result.rows.length);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    return { success: false, error: "Database query failed", details: error.message };
  } finally {
    client.release(); // Release the connection
  }
};

module.exports = { getSongsByName };
