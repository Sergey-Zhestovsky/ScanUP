let mongoose = require("../connect"),
  schemas = require("../models"),
  keyGenerator = require("../../modules/keyGenerator"),
  { ServerError, serverErrors } = require("../../classes/ServerError");

async function add(data) {
  let reception, responce = {}, scanner, uKey;

  try {
    do {
      uKey = keyGenerator();
      scanner = await schemas.Scanner.findOne({ uId: uKey });
    } while (scanner);

    scanner = new schemas.Scanner({ uId: uKey });
    scanner = await scanner.save();

    reception = new schemas.TransportSystemReception({ ...data, scannerId: scanner._id });
    reception = await reception.save();

    responce = (await schemas.TransportSystemReception.aggregate([{
      $match: {
        transportSystemId: new mongoose.Types.ObjectId(reception.transportSystemId)
      }
    }, {
      $count: "receptions"
    }]))[0];
    responce = { ...responce, ...reception._doc };
  } catch (error) {
    throw ServerError.customError("add_tsReception", error);
  }

  return responce;
}

async function addByGlobalModeratorId(data, id) {
  try {
    let transportSystemId = (await schemas.TransportSystem.findOne({
      adminId: id
    }))._id;

    let reception = await add({ ...data, transportSystemId });

    return (await schemas.TransportSystemReception.aggregate([{
      $match: { _id: new mongoose.Types.ObjectId(reception._id) }
    }, {
      $lookup: {
        from: "users",
        localField: "_id",
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
    }, {
      $lookup: {
        from: "scanners",
        localField: "scannerId",
        foreignField: "_id",
        as: "scanner"
      }
    }, {
      $unwind: {
        path: "$scanner",
        preserveNullAndEmptyArrays: true
      }
    }]))[0];
  } catch (error) {
    throw ServerError.customError("addByGlobalModeratorId_tsReception", error);
  }
}

async function get(query = {}, filter = []) {
  query = query instanceof Object ? query : {};
  filter = filter instanceof Array ? filter : [filter];

  try {
    return await schemas.TransportSystemReception.aggregate([{
      $match: query
    },
    ...filter]);
  } catch (error) {
    throw ServerError.customError("get_tsReception", error);
  }
}

async function getOne(query, filter) {
  return (await get(query, filter))[0] || null;
}

async function getComplete(query, filter = []) {
  filter = filter instanceof Array ? filter : [filter];

  let newFilter = [{
    $lookup: {
      from: "users",
      localField: "_id",
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
  }, {
    $lookup: {
      from: "scanners",
      localField: "scannerId",
      foreignField: "_id",
      as: "scanner"
    }
  }, {
    $unwind: {
      path: "$scanner",
      preserveNullAndEmptyArrays: true
    }
  }, ...filter];

  return await get(query, newFilter);
}

async function getFreeReceptions(query, filter = []) {
  filter = filter instanceof Array ? filter : [filter];

  let newFilter = [{
    $match: { moderator: { $exists: false } }
  }, ...filter];

  return await getComplete(query, newFilter);
}

async function getFreeReceptionsByTSId(id) {
  let query = {
    transportSystemId: new mongoose.Types.ObjectId(id)
  };

  return await getFreeReceptions(query);
}

async function getReceptionsByGlobalModeratorId(id) {
  try {
    let transportSystemId = (await schemas.TransportSystem.findOne({
      adminId: id
    }))._id;

    return await getComplete({
      transportSystemId: new mongoose.Types.ObjectId(transportSystemId)
    });
  } catch (error) {
    throw ServerError.customError("getReceptionsByGlobalModeratorId_tsReception", error);
  }
}

async function getFreeReceptionsByGlobalModeratorId(id) {
  try {
    let transportSystemId = (await schemas.TransportSystem.findOne({
      adminId: id
    }))._id;

    return await getFreeReceptionsByTSId(transportSystemId);
  } catch (error) {
    throw ServerError.customError("getFreeReceptionsByGlobalModeratorId_tsReception", error);
  }
}

module.exports = {
  add,
  addByGlobalModeratorId,
  get,
  getOne,
  getComplete,
  getFreeReceptions,
  getFreeReceptionsByTSId,
  getReceptionsByGlobalModeratorId,
  getFreeReceptionsByGlobalModeratorId,
};