/** @format */

const fs = require("fs");

const extractTextFromPDF = require("../../utils/extractText.js");
const getUnformatedResult = require("../../utils/unformatedResult.js");
const getFormatResults = require("../../utils/formatedResult.js");

const uploadController = async (req, res) => {
    try {
        const filePath = req.file.path;
        // Ensure the uploaded file is a PDF
        if (req.file.mimetype !== "application/pdf") {
            fs.unlinkSync(filePath);
            return res
                .status(400)
                .json({ error: "Only PDF files are allowed." });
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found." });
        }

        // Extract text from the PDF using pdfjs-dist
        const text = await extractTextFromPDF(filePath);
        const unformatedResult = getUnformatedResult(text);
        const results = getFormatResults(unformatedResult);

        res.json({ results });
    } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).json({ error: "Failed to process the PDF file." });
    } finally {
        try {
            fs.unlinkSync(filePath);
        } catch (unlinkErr) {
            console.error("Failed to delete the file:", unlinkErr);
        }
    }
};

module.exports = uploadController;
