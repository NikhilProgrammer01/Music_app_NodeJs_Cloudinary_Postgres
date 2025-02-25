const express = require("express");
const { searchSongs } = require("../controllers/songController");

const router = express.Router();

router.get("/songs", searchSongs);

module.exports = router;
