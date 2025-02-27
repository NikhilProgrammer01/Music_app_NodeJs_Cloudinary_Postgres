const express = require("express");
const { getAllSongsController } = require("../controllers/songController");

const router = express.Router();

// router.get("/songs", searchSongs);
router.get("/all-songs", getAllSongsController);
module.exports = router;
