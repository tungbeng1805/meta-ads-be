const db = require("../../common/connect.js");
const { returnResponse, convertData } = require("../../utils/index.js");

const getList = async (req, res) => {
  try {
    const { business_id } = req.query;
    if (!business_id) {
      db.query("SELECT * FROM campaigns ORDER BY id DESC", (err, results) => {
        if (err) return returnResponse(res, 400, { err });
        return returnResponse(res, 200, { data: results });
      });
      return;
    }

    db.query("SELECT * FROM campaigns WHERE business_id = ? ORDER BY id DESC", [business_id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: results });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const getDetail = async (req, res) => {
  try {
    db.query("SELECT * FROM campaigns WHERE id = ?", [req.params.id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: results[0] });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const createCampaigns = async (req, res) => {
  try {
    const data = req.body;
    const obj = convertData(req.body);
    db.query("INSERT INTO campaigns SET ?", obj, (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: { id: results.insertId, ...data } });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const updateCampaigns = async (req, res) => {
  try {
    const data = req.body;
    const obj = convertData(req.body);
    db.query("UPDATE campaigns SET ? WHERE id = ?", [obj, req.params.id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: { id: results.insertId, ...data } });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const deleteCampaigns = async (req, res) => {
  try {
    db.query("DELETE FROM campaigns WHERE id = ?", [req.params.id], (err) => {
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
  createCampaigns,
  updateCampaigns,
  deleteCampaigns,
};
