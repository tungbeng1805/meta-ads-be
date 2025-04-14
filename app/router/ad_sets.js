const express = require("express");
const { getList, getDetail, createAdSets, updateAdSets, deleteAdSets } = require("../controllers/ad_sets");

const router = express.Router();

router.get("/get-list", getList);
router.get("/get/:id", getDetail);
router.post("/create", createAdSets);
router.put("/update/:id", updateAdSets);
router.delete("/delete/:id", deleteAdSets);

module.exports = router;
