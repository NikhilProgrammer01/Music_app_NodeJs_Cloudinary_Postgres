const { getSongsByName } = require("../models/songModel");

const searchSongs = async (req, res) => {
  try {
    const { name } = req.query;
    console.log("Received request with name:", name);

    if (!name) {
      console.error("❌ Error: Song name is required");
      return res.status(400).json({ error: "Song name is required" });
    }

    const songs = await getSongsByName(name);
    console.log("✅ Songs fetched successfully:", songs.length);
    
    res.json(songs);
  } catch (error) {
    console.error("❌ Error fetching songs:", error);
    res.status(500).json({ error: "Internal Server Error happing" });
  }
};

module.exports = { searchSongs };
