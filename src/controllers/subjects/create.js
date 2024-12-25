/** @format */
const create = require("../../lib/subjects/create");

const createController = async (req, res) => {
    console.log("req_body ", req.body);
    const name = req.body.name || "";
    const code = req.body.code;
    const theoryFailed = /* req.body.theoryFailed || */ [];
    const practicalFailed = /* req.body.practicalFailed || */ [];

    //TODO: check Duplicate createion
    await create({ name, code, theoryFailed, practicalFailed });
    res.status(201).json({ msg: "subject created successfull" });
};

module.exports = createController;
