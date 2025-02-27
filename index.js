const express = require("express");
require("dotenv").config();
// const dbRoutes = require("./routes/dbRoutes");
const songRoutes = require("./routes/songRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", songRoutes);
// app.use("/api", dbRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
