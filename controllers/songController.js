const { getSongsByName } = require("../models/songModel");

const searchSongs = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Song name is required" });
    }

    const songs = await getSongsByName(name);
    res.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { searchSongs };
