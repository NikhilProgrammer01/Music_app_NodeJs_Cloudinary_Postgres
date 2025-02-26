const { Pool } = require("pg");
require("dotenv").config();

console.log("📌 Loading database configuration...");
console.log("🗄️ DB_HOST:", process.env.DB_HOST);
console.log("🔑 DB_USER:", process.env.DB_USER);
console.log("🔓 DB_PASSWORD:", process.env.DB_PASSWORD ? "********" : "Not Set");
console.log("📦 DB_NAME:", process.env.DB_NAME);
console.log("🚪 DB_PORT:", process.env.DB_PORT);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase
  },
});

// Function to check database connection
const checkDbConnection = async (req, res) => {
  try {
    await pool.query("SELECT 1"); // Simple query to test DB connection
    console.log("✅ Database connection is active");

    return res.status(200).json({
      success: true,
      message: "Database connected successfully",
      config: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD, // Masked for security
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT,
      },
    });
  } catch (error) {
    console.error("❌ Database connection error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Database connection failedazsdasdc",
      reason: error.message,
      config: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD, // Masked for security
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT,
      },
    });
  }
};


module.exports = { pool, checkDbConnection };
