/** @format */

const Subject = require("../../model/subject");
const create = async ({
    name,
    code,
    theoryFailed = [],
    practicalFailed = [],
}) => {
    if (!code) throw new Error("Bad Request");
    const book = new Subject({
        name,
        code,
        theoryFailed,
        practicalFailed,
    });
    return book.save();
};

module.exports = create;
