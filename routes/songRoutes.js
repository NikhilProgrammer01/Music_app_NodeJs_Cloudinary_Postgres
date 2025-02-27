const express = require("express");
const { getAllSongsController,searchSongsByTitleController } = require("../controllers/songController");

const router = express.Router();
router.get("/search-songs", searchSongsByTitleController); 
// router.get("/songs", searchSongs);
router.get("/all-songs", getAllSongsController);
module.exports = router;
