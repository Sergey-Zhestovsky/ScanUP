let mongoose = require("../connect"),
  schemas = mongoose.models,
  userActions = require("./user"),
  { ServerError, serverErrors } = require("../../classes/ServerError"),
  getTSSchema = require("../../data/dbAggregationSchemas/getTransportSystem");

async function get(query = {}, filter = []) {
  query = query instanceof Object ? query : {};
  filter = filter instanceof Array ? filter : [filter];

  try {
    return await schemas.TransportSystem.aggregate([{
      $match: query
    },
    ...filter]);
  } catch (error) {
    throw ServerError.customError("get_ts", error);
  }
}

async function getPublic(query, filter = []) {
  filter = filter instanceof Array ? filter : [filter];

  return await get(query, [...getTSSchema, ...filter]);
}

async function getOneById(id) {
  return (await getPublic({
    _id: new mongoose.Types.ObjectId(id)
  }))[0];
}

async function getStatistics() {
  try {
    return await get({}, [{
      $lookup: {
        from: "transportsystemtypes",
        localField: "typeId",
        foreignField: "_id",
        as: "type"
      }
    }, {
      $unwind: {
        path: "$type",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "transportsystemreceptions",
        localField: "_id",
        foreignField: "transportSystemId",
        as: "receptions"
      }
    }, {
      $addFields: {
        receptionsCount: { $size: "$receptions" }
      }
    }, {
      $addFields: {
        receptions: {
          $map: {
            input: "$receptions",
            as: "reception",
            in: "$$reception._id"
          }
        }
      }
    }, {
      $lookup: {
        from: "users",
        let: { receptions: "$receptions" },
        pipeline: [
          { $match: { $expr: { $in: ["$transportSystemReceptionId", "$$receptions"] } } },
          { $project: { _id: 1 } }
        ],
        as: "users"
      }
    }, {
      $project: { receptions: 0 }
    }, {
      $addFields: {
        users: {
          $map: {
            input: "$users",
            as: "user",
            in: "$$user._id"
          }
        }
      }
    }, {
      $addFields: {
        moderatorsCount: { $size: "$users" }
      }
    }, {
      $lookup: {
        from: "scans",
        let: { users: "$users" },
        pipeline: [
          { $match: { $expr: { $in: ["$managerId", "$$users"] } } },
          { $project: { _id: 1 } }
        ],
        as: "scans"
      }
    }, {
      $addFields: {
        scans: {
          $map: {
            input: "$scans",
            as: "scan",
            in: "$$scan._id"
          }
        }
      }
    }, {
      $project: { users: 0 }
    }, {
      $lookup: {
        from: "baggages",
        let: { scans: "$scans" },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  { $in: ["$formerScanId", "$$scans"] },
                  { $in: ["$latterScanId", "$$scans"] },
                ]
              }
            }
          },
          { $project: { _id: 1 } }
        ],
        as: "baggages"
      }
    }, {
      $addFields: {
        baggagesCount: { $size: "$baggages" }
      }
    }, {
      $project: { scans: 0, baggages: 0 }
    }]);
  } catch (error) {
    throw ServerError.customError("getStatistics_ts", error);
  }
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

      tsData = { ...tsData, adminId: user._id };
    }

    let ts = new schemas.TransportSystem(tsData),
      response = await ts.save();

    tsResult = await getOneById(response._id);
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
  getPublic,
  getOneById,
  getStatistics,
  add,
  deleteOne,
};