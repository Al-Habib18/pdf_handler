/** @format */

const findByCode = require("../../lib/subjects/findByCode");
const findByCodeController = async (req, res) => {
    const { code } = req.params;
    if (!code) {
        res.json({ msg: "bad Request" });
    }
    const subject = await findByCode(code);

    res.status(200).json({
        msg: "subject retrive successfull",
        data: subject,
    });
};

module.exports = findByCodeController;
