/** @format */
const deleteById = require("../../lib/subjects/deleteById");
const deleteByIdController = async (req, res) => {
    const { id } = req.params;
    await deleteById(id);
    res.json({ msg: "subject deleted subcessfully" });
};

module.exports = deleteByIdController;
