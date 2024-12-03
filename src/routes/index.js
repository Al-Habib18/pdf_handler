/** @format */

const { Router } = require("express");
const router = Router();
const upload = require("../services/uploader");
const fs = require("fs");
// const pdfParse = require("pdf-parse");

const regex = /\b\d{6}\{(\d{5}\(T\)(?:,\d{5}\(T\))*)\}/g;
router.post("/upload", upload.single("pdf"), async (req, res, next) => {
    const filePath = req.file.path;

    // Read the uploaded file
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read the file." });
        }

        const results = [];
        let match;

        // Extract matches
        while ((match = regex.exec(data)) !== null) {
            const rollNumber = match[0].slice(0, 6); // Extract the roll number
            const subjectCodes = match[1].split(","); // Extract and split subject codes

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
    });
});

// router.get("/files/:key", (req, res, next) => {
//     try {
//         const data = getFileStream(req.params.key.trim());
//         data.pipe(res);
//         // res.send("ok");
//     } catch (err) {
//         next(err);
//     }
// });

// router.post("/files", upload.array("avatar", 3), (req, res, next) => {
//   try {
//     console.log(req.file);

//     res.send("File uploaded successfully.");
//   } catch (err) {
//     next(err);
//   }
// });

// const fields=[
//   {
//     name:"avatar",
//     maxCount:1
//   },
//   {
//     name:"docs",
//     maxCount:3
//   }
// ]
// router.post("/files", upload.fields(fields), (req, res, next) => {
//   try {
//     console.log(req.files);

//     res.send("File uploaded successfully.");
//   } catch (err) {
//     next(err);
//   }
// });
module.exports = router;
