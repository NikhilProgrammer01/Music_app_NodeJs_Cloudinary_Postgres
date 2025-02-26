const express = require("express");
const { checkDbConnection } = require("../config/db");

const router = express.Router();

// Endpoint to check database connection
router.get("/check-db", checkDbConnection);

module.exports = router;
