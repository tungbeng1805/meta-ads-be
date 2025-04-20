const db = require("../../common/connect.js");
const { returnResponse } = require("../../utils/index.js");

const getList = async (req, res) => {
  try {
    const business_id = req.query.business_id
      ?.split(",")
      .map((id) => parseInt(id))
      .filter(Boolean);
    const campaign_id = req.query.campaign_id
      ?.split(",")
      .map((id) => parseInt(id))
      .filter(Boolean);

    if (business_id?.length) {
      db.query(
        `SELECT ad_sets.* 
         FROM ad_sets 
         JOIN campaigns ON ad_sets.campaign_id = campaigns.id 
         WHERE campaigns.business_id IN (?)`,
        [business_id],
        (err, results) => {
          if (err) return returnResponse(res, 400, { err });
          return returnResponse(res, 200, { data: results });
        }
      );
      return;
    }

    if (campaign_id?.length) {
      db.query(`SELECT * FROM ad_sets WHERE campaign_id IN (?)`, [campaign_id], (err, results) => {
        if (err) return returnResponse(res, 400, { err });
        return returnResponse(res, 200, { data: results });
      });
      return;
    }

    db.query("SELECT * FROM ad_sets", (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: results });
    });
    return;
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const getDetail = async (req, res) => {
  try {
    db.query("SELECT * FROM ad_sets WHERE id = ?", [req.params.id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: results[0] });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const createAdSets = async (req, res) => {
  try {
    const data = req.body;
    db.query("INSERT INTO ad_sets SET ?", data, (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: { id: results.insertId, ...data } });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const updateAdSets = async (req, res) => {
  try {
    const data = req.body;
    db.query("UPDATE ad_sets SET ? WHERE id = ?", [data, req.params.id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: { id: results.insertId, ...data } });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const deleteAdSets = async (req, res) => {
  try {
    db.query("DELETE FROM ad_sets WHERE id = ?", [req.params.id], (err) => {
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
  createAdSets,
  updateAdSets,
  deleteAdSets,
};
