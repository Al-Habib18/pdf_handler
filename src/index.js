/** @format */

import express from "express";
import multer from "multer";
import uploadController from "./controllers/upload2.js";

const app = express();
const port = 3003;

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Route to handle PDF uploads
app.post("/upload", upload.single("file"), uploadController);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
