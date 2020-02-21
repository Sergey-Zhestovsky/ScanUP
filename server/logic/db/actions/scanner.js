let mongoose = require("../connect"),
  schemas = mongoose.models,
  { ServerError } = require("../../classes/ServerError");

async function get(query = {}, filter = []) {
  query = query instanceof Object ? query : {};
  filter = filter instanceof Array ? filter : [filter];

  try {
    return await schemas.Scanner.aggregate([{
      $match: query
    },
    ...filter]);
  } catch (error) {
    throw ServerError.customError("get_scanner", error);
  }
}

async function getPublic(query, filter = []) {
  filter = filter instanceof Array ? filter : [filter];

  try {
    let newFiler = [{
      $lookup: {
        from: "transportsystemreceptions",
        localField: "_id",
        foreignField: "scannerId",
        as: "reception"
      }
    }, {
      $unwind: {
        path: "$reception",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "transportsystems",
        localField: "reception.transportSystemId",
        foreignField: "_id",
        as: "transportSystem"
      }
    }, {
      $unwind: {
        path: "$transportSystem",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "users",
        localField: "reception._id",
        foreignField: "transportSystemReceptionId",
        as: "moderator"
      }
    }, {
      $unwind: {
        path: "$moderator",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $project: { "moderator.salt": 0, "moderator.userPassword": 0 }
    }, ...filter];

    return await get(query, newFiler);
  } catch (error) {
    throw ServerError.customError("get_scanner", error);
  }
}

async function getScannerByUId(uId) {
  return (await getPublic({ uId }))[0] || null;
}

module.exports = {
  get,
  getScannerByUId
};