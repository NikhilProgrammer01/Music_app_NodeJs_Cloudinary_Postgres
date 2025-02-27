const { getAllSongs,getSongsByTitle } = require("../models/songModel");



const getAllSongsController = async (req, res) => {
  console.log("🟢 Received request to fetch all songs");

  // Call the database function
  const result = await getAllSongs();

  if (!result.success) {
    console.error("❌ Error fetching songs:", result.error);
    return res.status(500).json({ success: false, error: result.error });
  }

  if (result.data.length === 0) {
    console.warn("⚠️ No songs found in database.");
    return res.status(404).json({ success: false, error: "No songs found" });
  }

  console.log("✅ Songs fetched successfully:", result.data.length);
  return res.status(200).json({ success: true, data: result.data });
};


const searchSongsByTitleController = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ success: false, error: "Title parameter is required" });
  }

  console.log(`🔎 Searching for songs starting with: "${title}"`);
  
  const result = await getSongsByTitle(title);
  if (!result.success) {
    console.error("❌ Error searching songs:", result.error);
    return res.status(500).json({ success: false, error: result.error });
  }

  if (result.data.length === 0) {
    console.warn("⚠️ No matching songs found.");
    return res.status(404).json({ success: false, error: "No matching songs found" });
  }

  console.log("✅ Songs found:", result.data.length);
  return res.status(200).json({ success: true, data: result.data });
};

module.exports = { getAllSongsController ,searchSongsByTitleController};
