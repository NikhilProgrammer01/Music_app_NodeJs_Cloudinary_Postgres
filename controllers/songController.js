const { getAllSongs, getSongsByTitle } = require("../models/songModel");

const getAllSongsController = async (req, res) => {
  console.log("🟢 Fetching all songs...");
  const result = await getAllSongs();

  if (!result.success) {
    return res.status(500).json({ success: false, error: result.error });
  }

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
    return res.status(500).json({ success: false, error: result.error });
  }

  return res.status(200).json({ success: true, data: result.data });
};

module.exports = { getAllSongsController, searchSongsByTitleController };
