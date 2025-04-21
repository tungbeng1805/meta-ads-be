const express = require("express");
const { updateFormFace, getList } = require("../controllers/form_face/index.js");

const router = express.Router();

router.put("/update", updateFormFace);
router.get("/get", getList);

module.exports = router;
