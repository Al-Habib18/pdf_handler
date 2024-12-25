/** @format */

const updatePropertise = require("../../lib/subjects/update");
const updateController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.json({ msg: "Id is require" });
    }
    const subject = await updatePropertise(id, {});

    res.status(200).json({
        msg: "subject updated successfull",
        data: subject,
    });
};

module.exports = updateController;
