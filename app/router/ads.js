const express = require("express");
const { getList, getDetail, createAds, updateAds, deleteAds } = require("../controllers/ads");

const router = express.Router();

router.get("/get-list", getList);
router.get("/get/:id", getDetail);
router.post("/create", createAds);
router.put("/update/:id", updateAds);
router.delete("/delete/:id", deleteAds);

module.exports = router;
