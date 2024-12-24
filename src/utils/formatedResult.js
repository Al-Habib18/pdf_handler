/** @format */

function getFormatResults(data, subjectNames = {}) {
    // Map to store grouped data by subject code
    const formattedData = {};

    data.forEach((item) => {
        const { rollNumber, subjectCodes } = item;

        subjectCodes.forEach((code) => {
            // Extract the subject base code and type
            const [subjectBaseCode, type] = code.split("(");
            const isTheory = type === "T)";
            const isBoth = type === "T,P)" || "P,T)";

            // If the subject code doesn't exist, initialize it
            if (!formattedData[subjectBaseCode]) {
                formattedData[subjectBaseCode] = {
                    subject_code: subjectBaseCode,
                    subject_name:
                        subjectNames[subjectBaseCode] || "Unknown Subject",
                    theory_failed: [],
                    practical_failed: [],
                };
            }

            // Add roll number to the appropriate list
            if (isBoth) {
                formattedData[subjectBaseCode].theory_failed.push(
                    Number(rollNumber)
                );
                formattedData[subjectBaseCode].practical_failed.push(
                    Number(rollNumber)
                );
            } else if (isTheory) {
                formattedData[subjectBaseCode].theory_failed.push(
                    Number(rollNumber)
                );
            } else {
                formattedData[subjectBaseCode].practical_failed.push(
                    Number(rollNumber)
                );
            }
        });
    });

    // Convert the map to an array
    return Object.values(formattedData);
}

module.exports = getFormatResults;
