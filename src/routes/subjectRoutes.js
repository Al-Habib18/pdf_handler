/** @format */

const router = require("express").Router();
const {
    createController,
    findAllController,
    findByCodeController,
    updateController,
    findByNameController,
    findByIdController,
    deleteByCodeController,
    deleteByIdController,
} = require("../controllers/subjects");

router.get("/", findAllController);
router.post("/", createController);

router.get("/search/codes/:code", findByCodeController);
router.get("/search/names/:name", findByNameController);

router.put("/:id", updateController);
router.get("/:id", findByIdController);
router.delete("/:id", deleteByIdController);
router.delete("/delete/:code", deleteByCodeController);

module.exports = router;
