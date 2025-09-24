const express = require("express");
const cors = require("cors");

const app = express(); // ✅ define app first

// Use CORS middleware
app.use(cors());

// Your other middleware
app.use(express.json());

// Your routes
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
