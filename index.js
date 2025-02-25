const express = require("express");
require("dotenv").config();
const songRoutes = require("./routes/songRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", songRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
