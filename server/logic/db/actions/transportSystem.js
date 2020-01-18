let mongoose = require("../connect"),
  schemas = require("../models"),
  userActions = require("./user"),
  { ServerError, serverErrors } = require("../../classes/ServerError"),
  getTSSchema = require("../../data/dbAggregationSchemas/getTransportSystem");

async function get(query) {
  let ts, aggregationSchema = getTSSchema;

  if (query)
    aggregationSchema = [{
      $match: query
    }, ...aggregationSchema];

  try {
    ts = await schemas.TransportSystem.aggregate(aggregationSchema);
  } catch (error) {
    throw ServerError.customError("getAll_ts", error);
  }

  return ts;
}

async function getOne(id) {
  return (await get({
    _id: new mongoose.Types.ObjectId(id)
  }))[0];
}

async function add({ login, password, selfControl, ...rest }) {
  let tsResult, tsData = { ...rest, selfControl };

  try {
    if (selfControl) {
      let privilege = await schemas.Privilege.findOne({ index: "02" });
      let user = await userActions.add({
        name: "Global moderator",
        email: login,
        password,
        privilegeId: privilege._id
      });

      tsData = { ...tsData, adminId: user.id };
    }

    let ts = new schemas.TransportSystem(tsData),
      responce = await ts.save();

    tsResult = await getOne(responce._id);
  } catch (error) {
    throw ServerError.customError("add_ts", error);
  }

  return tsResult;
}

async function deleteOne(id) {
  let ts, user, result;

  try {
    ts = (await schemas.TransportSystem.aggregate([{
      $match: { _id: new mongoose.Types.ObjectId(id) }
    }, {
      $lookup: {
        from: "transportsystemreceptions",
        localField: "_id",
        foreignField: "transportSystemId",
        as: "receptions"
      }
    }, {
      $addFields: {
        receptions: { $size: "$receptions" }
      }
    }]))[0];

    if (ts.receptions !== 0)
      throw new ServerError(serverErrors.TRANSPORT_SYSTEM_REMOVE__RECEPTIONS);

    if (ts.adminId) {
      user = await userActions.removeGlobalModerator(ts.adminId);
    }

    result = await schemas.TransportSystem.findByIdAndRemove(id);
  } catch (error) {
    throw ServerError.customError("add_ts", error);
  }

  return true;
}

module.exports = {
  get,
  add,
  deleteOne
};