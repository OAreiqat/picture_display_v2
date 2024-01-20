const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Directory containing images
const imagesDir = path.join(__dirname, "images");

// This is the image array of arrays that you can change.
const displayMap = [
  ["cat.jpeg", 3],
  ["dog.jpeg", 5],
  ["calendar", 1],
  ["dog.jpeg", 9],
  ["calendar", 4],
];

app.use(express.static("public")); // Serve static files from 'public' directory
app.use("/images", express.static(imagesDir)); // Serve images

// Endpoint to get image display data
app.get("/image-data", (req, res) => {
  res.json(displayMap);
});

// This is the entry point to the server.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
