/** @format */

const createController = (req, res) => {
    res.status(201).json({ msg: "subject created successfull" });
};

module.exports = createController;
