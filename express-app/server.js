// express-app/index.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { fetchAndMergeData } = require("./services/fetchChargers");
const { normalizeChargers } = require("./services/normalize");
const { summarizeBySite } = require("./services/summarize");

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/api/chargers", async (req, res) => {
  try {
    const { data, statusMap } = await fetchAndMergeData();
    const normalized = normalizeChargers(data, statusMap);
    const summary = summarizeBySite(normalized);
    res.json(summary);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Failed to fetch charger data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
