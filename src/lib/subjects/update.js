/** @format */

const Subject = require("../../model/subject");
const updateProperties = async (
    id,
    { name, theoryFailed, practicalFailed }
) => {
    const subject = await Subject.findById(id);
    if (!subject) {
        throw new Error("subject Not Found");
    }

    const payload = { name, theoryFailed, practicalFailed };

    Object.keys(payload).forEach(
        (key) => (subject[key] = payload[key] ?? subject[key])
    );

    await subject.save();
    return subject;
};

module.exports = updateProperties;
