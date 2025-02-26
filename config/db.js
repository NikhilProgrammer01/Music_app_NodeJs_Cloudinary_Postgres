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

pool.connect()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool;
