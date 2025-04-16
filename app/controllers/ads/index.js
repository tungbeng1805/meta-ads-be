const db = require("../../common/connect.js");
const { returnResponse } = require("../../utils/index.js");

const getList = async (req, res) => {
  const { business_id, campaign_id, ad_set_id } = req.query;
  try {
    if (business_id) {
      db.query(
        "SELECT ads.* FROM ads JOIN ad_sets ON ads.ad_set_id = ad_sets.id JOIN campaigns ON ad_sets.campaign_id = campaigns.id WHERE campaigns.business_id = ?",
        [business_id],
        (err, results) => {
          if (err) return returnResponse(res, 500, { err });
          return returnResponse(res, 200, { data: results });
        }
      );
      return;
    }
    if (campaign_id) {
      db.query(
        "SELECT ads.* FROM ads JOIN ad_sets ON ads.ad_set_id = ad_sets.id WHERE ad_sets.campaign_id = ?",
        [campaign_id],
        (err, results) => {
          if (err) return returnResponse(res, 500, { err });
          return returnResponse(res, 200, { data: results });
        }
      );
      return;
    }
    if (ad_set_id) {
      db.query("SELECT * FROM ads WHERE ad_set_id = ?", [ad_set_id], (err, results) => {
        if (err) return returnResponse(res, 500, { err });
        return returnResponse(res, 200, { data: results });
      });
      return;
    }
    db.query("SELECT * FROM ads", (err, results) => {
      if (err) return returnResponse(res, 500, { err });
      return returnResponse(res, 200, { data: results });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const getDetail = async (req, res) => {
  try {
    db.query("SELECT * FROM ads WHERE id = ?", [req.params.id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: results[0] });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const createAds = async (req, res) => {
  try {
    const data = req.body;
    db.query("INSERT INTO ads SET ?", data, (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: { id: results.insertId, ...data } });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const updateAds = async (req, res) => {
  try {
    const data = req.body;
    db.query("UPDATE ads SET ? WHERE id = ?", [data, req.params.id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: { id: results.insertId, ...data } });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const deleteAds = async (req, res) => {
  try {
    db.query("DELETE FROM ads WHERE id = ?", [req.params.id], (err) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { message: "Deleted successfully" });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

module.exports = {
  getList,
  getDetail,
  createAds,
  updateAds,
  deleteAds,
};
