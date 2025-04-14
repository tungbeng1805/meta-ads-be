const express = require("express");
const {
  getList,
  getDetail,
  createCampaigns,
  updateCampaigns,
  deleteCampaigns,
} = require("../controllers/campaigns/index.js");

const router = express.Router();

router.get("/get-list", getList);
router.get("/get/:id", getDetail);
router.post("/create", createCampaigns);
router.put("/update/:id", updateCampaigns);
router.delete("/delete/:id", deleteCampaigns);

module.exports = router;
