const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const businessRouter = require("./app/router/buiness.js");
const AdSetsRouter = require("./app/router/ad_sets.js");
const AdsRouter = require("./app/router/ads.js");
const CampaignsRouter = require("./app/router/campaigns.js");
const uploadRouter = require("./app/router/upload.js");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("", (req, res) => {
  return res.status(200).json({ message: "Connection successful" });
});

app.use("/api/business", businessRouter);
app.use("/api/ad_sets", AdSetsRouter);
app.use("/api/ads", AdsRouter);
app.use("/api/campaigns", CampaignsRouter);
app.use("/api/upload", uploadRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log("Connected to backend", 3000);
});
