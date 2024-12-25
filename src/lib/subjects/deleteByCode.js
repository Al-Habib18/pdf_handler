/** @format */

const Subject = require("../../model/subject");
const deleteByCode = async (code) => {
    const subject = await Subject.deleteOne({ code: code });

    return subject;
};

module.exports = deleteByCode;
