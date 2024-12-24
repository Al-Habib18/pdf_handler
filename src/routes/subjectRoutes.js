/** @format */

const router = require("express").Router();
const {
    createController,
    findAllController,
} = require("../controllers/subjects");

router.get("/", findAllController);
router.post("/", createController);

module.exports = router;
