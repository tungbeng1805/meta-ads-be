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

const getMenuItems = async (req, res) => {
  try {
    const { campaign_id } = req.query;

    if (!campaign_id) {
      return returnResponse(res, 400, { error: "Business ID is required" });
    }

    db.query(
      "SELECT id, campaign as name, resultsCost, costPerResultCost, amountSpent FROM campaigns WHERE id = ?",
      [campaign_id],
      async (err, campaignResults) => {
        if (err) return returnResponse(res, 400, { err });

        const campaigns = await Promise.all(
          campaignResults.map(async (campaign) => {
            return new Promise((resolve, reject) => {
              db.query(
                "SELECT id, adSet as name FROM ad_sets WHERE campaign_id = ?",
                [campaign.id],
                async (err, adSetResults) => {
                  if (err) reject(err);
                  const adSets = await Promise.all(
                    adSetResults.map(async (adSet) => {
                      return new Promise((resolve, reject) => {
                        db.query("SELECT id, ad as name FROM ads WHERE ad_set_id = ?", [adSet.id], (err, adResults) => {
                          if (err) reject(err);
                          resolve({
                            id: adSet.id,
                            name: adSet.name,
                            groups: adResults,
                          });
                        });
                      });
                    })
                  );

                  resolve({
                    id: campaign.id,
                    name: campaign.name,
                    resultsCost: campaign.resultsCost,
                    costPerResultCost: campaign.costPerResultCost,
                    amountSpent: campaign.amountSpent,
                    groups: adSets,
                  });
                }
              );
            });
          })
        );

        return returnResponse(res, 200, { data: campaigns });
      }
    );
  } catch (error) {
    return returnResponse(res, 500, { error });
  }
};

module.exports = {
  updateFormFace,
  getList,
  getMenuItems,
};
