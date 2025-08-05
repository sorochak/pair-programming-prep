// express-app/index.js
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/chargers", (req, res) => {
  res.json([{ id: "A1", status: "online", lastSeen: Date.now() }]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
