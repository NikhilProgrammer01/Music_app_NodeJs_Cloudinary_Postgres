const { getSongsByName } = require("../models/songModel");

const searchSongs = async (req, res) => {
  try {
    console.log("🔍 Incoming request:", req.query); // Log request query parameters

    const { name } = req.query;
    if (!name) {
      console.warn("⚠️ No song name provided");
      return res.status(400).json({ error: "Song name is required" });
    }

    console.log(`🔍 Searching for songs with name: ${name}`);
    const songs = await getSongsByName(name);

    console.log(`✅ Found ${songs.length} songs`);
    res.json(songs);
  } catch (error) {
    console.error("❌ Error fetching songs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { searchSongs };
