// express-app/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { fetchAndMergeData } = require("./services/fetchChargers");

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

app.get("/chargers", (req, res) => {
  res.json([{ id: "A1", status: "online", lastSeen: Date.now() }]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
