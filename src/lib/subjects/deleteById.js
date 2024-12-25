/** @format */

const Subject = require("../../model/subject");
const deleteById = async (id) => {
    const subject = await Subject.deleteOne(id);

    return subject;
};

module.exports = deleteById;
