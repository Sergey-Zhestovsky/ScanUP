let mongoose = require("../connect"),
  schemas = require("../models"),
  { ServerError, serverErrors } = require("../../classes/ServerError");

async function getAll() {
  let tsTypes;

  try {
    tsTypes = await schemas.TransportSystemType.aggregate([{
      $lookup: {
        from: "transportsystemnamingstandards",
        localField: "namingStandardId",
        foreignField: "_id",
        as: "namingStandard"
      }
    }, {
      $unwind: {
        path: "$namingStandard",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $project: { "namingStandardId": 0 }
    }]);
  } catch (error) {
    throw ServerError.customError("getTSTypes_tsType", error).reject();
  }

  return tsTypes;
}

module.exports = {
  getAll
};