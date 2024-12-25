/** @format */

const findById = require("../../lib/subjects/findById");
const findByIdController = async (req, res) => {
    const { id } = req.params;
    const subject = await findById(id);
    res.json({ msg: "Subject retrive successfull", subject: subject });
};

module.exports = findByIdController;
