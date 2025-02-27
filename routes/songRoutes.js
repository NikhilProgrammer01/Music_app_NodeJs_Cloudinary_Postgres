const express = require("express");
const { getAllSongsController, searchSongsByTitleController } = require("../controllers/songController");

const router = express.Router();

router.get("/all-songs", getAllSongsController);
router.get("/search-songs", searchSongsByTitleController);

module.exports = router;
