/** @format */

const Subject = require("../../model/subject");
const findById = async (id) => {
    const subject = await Subject.findById(id);
    return subject;
};

module.exports = findById;
