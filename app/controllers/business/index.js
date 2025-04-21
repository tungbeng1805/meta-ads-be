const db = require("../../common/connect.js");
const { returnResponse } = require("../../utils/index.js");

const getList = async (req, res) => {
  try {
    db.query("SELECT * FROM business ORDER BY id DESC", (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: results });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const getDetail = async (req, res) => {
  try {
    db.query("SELECT * FROM business WHERE id = ?", [req.params.id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: results[0] });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const createBusiness = async (req, res) => {
  try {
    const data = req.body;
    db.query("INSERT INTO business SET ?", data, (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: { id: results.insertId, ...data } });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const updateBusiness = async (req, res) => {
  try {
    const data = req.body;
    db.query("UPDATE business SET ? WHERE id = ?", [data, req.params.id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: { id: results.insertId, ...data } });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    db.query("DELETE FROM business WHERE id = ?", [req.params.id], (err) => {
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
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
