/** @format */

const regex = /(\d{6})\s*\{\s*((?:\d{5}\(T\)(?:,\s*)?)*)\s*\}/g;
const getUnformatedResult = (text) => {
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
    return results;
};

module.exports = getUnformatedResult;
