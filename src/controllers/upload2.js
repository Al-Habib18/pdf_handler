/** @format */

import fs from "fs";
import pkg from "pdfjs-dist";

import extractTextFromPDF from "../utils/extractText";
import getUnformatedResult from "../utils/unformatedResult";
import formatResults from "../utils/formatedResult";

// Regular expression to match roll numbers and subject codes
// const regex = /\b\d{6}\{(\d{5}\(T\)(?:,\d{5}\(T\)))\}/g;
const regex = /(\d{6})\s*\{\s*((?:\d{5}\(T\)(?:,\s*)?)*)\s*\}/g;

const uploadController = async (req, res) => {
    const filePath = req.file.path;

    try {
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
        const results = formatResults(unformatedResult);

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

export default uploadController;
