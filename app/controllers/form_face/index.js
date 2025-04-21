const db = require("../../common/connect.js");
const { returnResponse, convertData } = require("../../utils/index.js");

const getList = async (req, res) => {
  try {
    db.query("SELECT * FROM form_face ORDER BY id DESC", (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: results[0] });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

const updateFormFace = async (req, res) => {
  try {
    const data = req.body;
    const obj = convertData(req.body);
    db.query("UPDATE form_face SET ? WHERE id = 1", [obj, req.params.id], (err, results) => {
      if (err) return returnResponse(res, 400, { err });
      return returnResponse(res, 200, { data: { id: results.insertId, ...data } });
    });
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

module.exports = {
  updateFormFace,
  getList,
};
