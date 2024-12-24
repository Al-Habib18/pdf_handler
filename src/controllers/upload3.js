/** @format */

import fs from "fs";
import pkg from "pdfjs-dist";
const { getDocument } = pkg;

// Regular expression to match roll numbers and subject codes
// const regex = /\b\d{6}\{(\d{5}\(T\)(?:,\d{5}\(T\)))\}/g;
// const regex = /(\d{6})\s*\{\s*((?:\d{5}\(T\)(?:,\s*)?)*)\s*\}/g;
const regex = /(\d{6})\s*\{\s*((?:\d{5}\((?:T|P|T,P|P,T)\)(?:,\s*)?)*)\s*\}/g;

const extractTextFromPDF = async (filePath) => {
    const loadingTask = getDocument(filePath);
    const pdfDoc = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
    }

    return fullText;
};
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

        const results = [];
        let match;

        while ((match = regex.exec(text)) !== null) {
            const rollNumber = match[1];
            const subjectCodes = match[2]
                .split(",")
                .map((code) => code.trim())
                .filter((code) => code);
            results.push({ rollNumber, subjectCodes });
        }

        // console.log(results)

        function getFailedSubjectsByRolls(data) {
            const subjectMap = {};
            console.log({ data });
            // Iterate through each result
            data?.forEach(({ rollNumber, subjectCodes }) => {
                subjectCodes.forEach((subject) => {
                    // Remove (T) or (P) from the subject code for the key
                    const subjectCode = subject.replace(/\(.*?\)/, "");
                    if (!subjectMap[subjectCode]) {
                        subjectMap[subjectCode] = [];
                    }
                    subjectMap[subjectCode].push(parseInt(rollNumber, 10));
                });
            });

            return subjectMap;
        }

        const failedSubjects = getFailedSubjectsByRolls(results);
        // console.log(failedSubjects);

        // results?.map(result=>{
        //     console.log(result?.subjectCodes)
        // })

        // res.json({ results });
        res.json(failedSubjects);
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
