/** @format */

const createController = require("./create");
const findAllController = require("./findAll");
const findByCodeController = require("./findByCode");
const findByNameController = require("./findByName");
const updateController = require("./update");
const findByIdController = require("./findById");
const deleteByCodeController = require("./deleteByCode");
const deleteByIdController = require("./deleteById");

module.exports = {
    createController,
    findAllController,
    findByCodeController,
    findByNameController,
    updateController,
    findByIdController,
    deleteByCodeController,
    deleteByIdController,
};
