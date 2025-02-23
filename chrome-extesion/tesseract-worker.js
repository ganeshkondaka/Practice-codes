const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());

// Endpoint to handle image uploads
app.post("/extract-text", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;

  try {
    console.log("Processing image...");
    const result = await Tesseract.recognize(imagePath, "eng");
    const extractedText = result.data.text;
    console.log("Extracted Text:\n", extractedText);

    res.json({ text: extractedText });
  } catch (error) {
    console.error("Error during text recognition:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
