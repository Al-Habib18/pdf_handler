/** @format */

const Subject = require("../../model/subject");
const findAll = async ({ page = 1, limit = 10 }) => {
    const subjects = await Subject.find()
        .skip(page * limit - limit)
        .limit(limit);

    return subjects;
};

module.exports = findAll;
