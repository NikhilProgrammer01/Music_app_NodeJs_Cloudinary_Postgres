const { getSongsByName,getAllSongs } = require("../models/songModel");

const searchSongs = async (req, res) => {
  console.log("🟢 Received request:", req.query);

  const { name } = req.query;
  
  if (!name) {
    console.warn("⚠️ Error: Song name is required");
    return res.status(400).json({ success: false, error: "Song name is required" });
  }

  // Call the database function
  const result = await getSongsByName(name);

  if (!result.success) {
    console.error("❌ Error fetching songs:", result.error);
    return res.status(500).json({ success: false, error: result.error });
  }

  if (result.data.length === 0) {
    console.warn("⚠️ No songs found for:", name);
    return res.status(404).json({ success: false, error: "No songs found" });
  }

  console.log("✅ Songs fetched successfully:", result.data.length);
  return res.status(200).json({ success: true, data: result.data });
};


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


module.exports = { searchSongs,getAllSongsController };
