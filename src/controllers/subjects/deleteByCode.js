/** @format */
const deleteByCode = require("../../lib/subjects/deleteByCode");
const deleteByCodeController = async (req, res) => {
    const { code } = req.params;
    await deleteByCode(code);

    res.json({ msg: "subject deleted subcessfully" });
};

module.exports = deleteByCodeController;
