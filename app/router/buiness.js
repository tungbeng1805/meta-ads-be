const express = require("express");
const {
  getList,
  getDetail,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} = require("../controllers/business/index.js");

const router = express.Router();

router.get("/get-list", getList);
router.get("/get/:id", getDetail);
router.post("/create", createBusiness);
router.put("/update/:id", updateBusiness);
router.delete("/delete/:id", deleteBusiness);

module.exports = router;
