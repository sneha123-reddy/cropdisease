// -----------------------------
// 🌱 Import dependencies
// -----------------------------
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// -----------------------------
// 🚀 Initialize app
// -----------------------------
const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------
// 📸 File upload setup (temporary folder)
// -----------------------------
const upload = multer({ dest: "uploads/" });

// -----------------------------
// 🔹 Default route (health check)
// -----------------------------
app.get("/", (req, res) => {
  res.send("✅ Backend is working and connected to the Colab model!");
});

// -----------------------------
// 🤖 Route: Send image to Colab model
// -----------------------------
app.post("/api/predict", upload.single("file"), async (req, res) => {
  try {
    console.log("✅ File received:", req.file); // <-- check this
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const COLAB_URL = "https://sizy-intergenerative-moira.ngrok-free.dev/predict";
    const response = await axios.post(COLAB_URL, formData, {
      headers: formData.getHeaders(),
    });

    console.log("✅ Response from Colab:", response.data); // <-- check this

    fs.unlinkSync(req.file.path);
    res.json({
      message: "Prediction received successfully!",
      prediction: response.data.prediction,
    });
  } catch (error) {
    console.error("Error sending image to Colab:", error.message);
    res.status(500).json({
      error: "Error connecting to the Colab model.",
      details: error.message,
    });
  }
});

// -----------------------------
// 🟢 Start server
// -----------------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
