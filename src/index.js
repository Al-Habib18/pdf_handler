/** @format */

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const app = express();
const port = 3002;

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// RegEx to match the roll number and subject codes
const regex = /\b\d{6}\{(\d{5}\(T\)(?:,\d{5}\(T\))*)\}/g;

// Route to handle PDF uploads
app.post("/upload", upload.single("file"), async (req, res) => {
    const filePath = req.file.path;

    console.log(filePath);
    // Check if the uploaded file is a PDF
    if (req.file.mimetype !== "application/pdf") {
        // Delete the uploaded file
        fs.unlink(filePath, () => {});
        return res.status(400).json({ error: "Only PDF files are allowed." });
    }

    try {
        // Read and parse the PDF file
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(pdfBuffer);

        // Extract text from the PDF
        const text = pdfData.text;

        const results = [];
        let match;

        // Extract matches using RegEx
        while ((match = regex.exec(text)) !== null) {
            const rollNumber = match[0].slice(0, 6); // Extract the roll number
            const subjectCodes = match[1].split(","); // Extract and split the subject codes

            results.push({
                rollNumber,
                subjectCodes,
            });
        }

        // Delete the uploaded file after processing
        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr)
                console.error("Failed to delete the file:", unlinkErr);
        });

        // Respond with extracted data
        res.json({ results });
    } catch (error) {
        // Handle errors
        fs.unlink(filePath, () => {});
        res.status(500).json({ error: "Failed to process the PDF file." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
