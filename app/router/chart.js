const express = require("express");
const { getList, getDetail, createChart, updateChart, deleteChart } = require("../controllers/chart/index.js");

const router = express.Router();

router.get("/get-list", getList);
router.get("/get/:id", getDetail);
router.post("/create", createChart);
router.put("/update/:id", updateChart);
router.delete("/delete/:id", deleteChart);

module.exports = router;
