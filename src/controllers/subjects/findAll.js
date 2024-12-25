/** @format */

const findAll = require("../../lib/subjects/findAll");
const findAllController = async (req, res) => {
    const subjects = await findAll({});
    res.status(200).json({
        msg: "subjects retrive successfull",
        data: subjects,
    });
};

module.exports = findAllController;
