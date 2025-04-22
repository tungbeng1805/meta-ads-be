const express = require("express");
const { updateFormFace, getList, getMenuItems } = require("../controllers/form_face/index.js");

const router = express.Router();

router.put("/update", updateFormFace);
router.get("/get", getList);
router.get("/get-menu", getMenuItems);

module.exports = router;
