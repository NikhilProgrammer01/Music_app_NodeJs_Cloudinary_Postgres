const pool = require("../config/db");

const getSongsByName = async (name) => {
  console.log("🔍 Searching for songs with name:", name);

  try {
    const query = `
      SELECT * FROM songs
      WHERE title LIKE $1
      ORDER BY title ASC
    `;

    console.log("📢 Running query:", query, "with param:", `${name}%`);

    // Directly use pool.query without pool.connect()
    const result = await pool.query(query, [`${name}%`]);

    console.log("✅ Query executed successfully, rows returned:", result.rows.length);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    return { success: false, error: "Database query failed", details: error.message };
  }
};
const getAllSongs = async (req, res) => {
  console.log("📌 Fetching all songs...");

  const client = await pool.connect(); // ✅ Explicitly connect

  try {
    const query = `SELECT * FROM songs ORDER BY title ASC`;
    console.log("📢 Running query:", query);

    const result = await client.query(query); // ✅ Use client instead of pool
    console.log("✅ Query executed successfully, rows returned:", result.rows.length);

    return res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    return res.status(500).json({ success: false, error: "Database query failed", details: error.message });
  } finally {
    client.release(); // ✅ Release the client
  }
};


module.exports = { getSongsByName ,getAllSongs};
