/** @format */

const Subject = require("../../model/subject");
const findByCode = async (code) => {
    const subject = await Subject.find({ code: code });

    return subject;
};

module.exports = findByCode;
