let mongoose = require("../connect"),
  schemas = mongoose.models,
  keyGenerator = require("../../modules/keyGenerator"),
  baggageStateActions = require("./baggageTransportationState"),
  round = require("../../modules/round"),
  { ServerError, serverErrors } = require("../../classes/ServerError"),

  getModeratorsFilter = require("../../data/dbAggregationSchemas/getModerators_filter");

async function add({ passport, weight, model, summary, descriptionHesh, time, managerId }) {
  try {
    let formerScan = new schemas.Scan({
      model,
      descriptionHesh,
      summary,
      weight,
      managerId,
      time
    });
    let formerScanResult = await formerScan.save();
    let transportationState = await schemas.BaggageTransportationState.findOne({ index: 1 });
    let uId, baggageByUId;

    do {
      uId = keyGenerator(3);
      baggageByUId = await schemas.Baggage.findOne({ uId });
    } while (baggageByUId);

    let baggage = new schemas.Baggage({
      uId,
      transportationStateId: transportationState._id,
      formerScanId: formerScanResult._id,
      passport
    });
    let baggageResult = await baggage.save();

    return baggageResult;
  } catch (error) {
    console.log(error)
    throw ServerError.customError("add_baggage", error);
  }
}

async function get(query = {}, filter = []) {
  query = query instanceof Object ? query : {};
  filter = filter instanceof Array ? filter : [filter];

  try {
    return await schemas.Baggage.aggregate([{
      $match: query
    },
    ...filter]);
  } catch (error) {
    throw ServerError.customError("get_baggage", error);
  }
}

async function getPublic(query, filter = []) {
  filter = filter instanceof Array ? filter : [filter];

  let transportationState = [{
    $lookup: {
      from: "baggagetransportationstates",
      let: { id: "$transportationStateId" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
        { $project: { _id: 0 } }
      ],
      as: "transportationState"
    }
  }, {
    $unwind: {
      path: "$transportationState",
      preserveNullAndEmptyArrays: true
    }
  }];

  let formerScan = [{
    $lookup: {
      from: "scans",
      localField: "formerScanId",
      foreignField: "_id",
      as: "formerScan"
    }
  }, {
    $unwind: {
      path: "$formerScan",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $lookup: {
      from: "users",
      let: { id: "$formerScan.managerId" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
        ...getModeratorsFilter,
        { $project: { "salt": 0, "userPassword": 0 } }
      ],
      as: "formerScan.manager"
    }
  }, {
    $unwind: {
      path: "$formerScan.manager",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $project: { "formerScan._id": 0 }
  }];

  let latterScan = [{
    $lookup: {
      from: "scans",
      localField: "latterScanId",
      foreignField: "_id",
      as: "latterScan"
    }
  }, {
    $unwind: {
      path: "$latterScan",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $lookup: {
      from: "users",
      let: { id: "$latterScan.managerId" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$id"] } } },
        ...getModeratorsFilter,
        { $project: { "salt": 0, "userPassword": 0 } }
      ],
      as: "latterScan.manager"
    }
  }, {
    $unwind: {
      path: "$latterScan.manager",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $project: { "latterScan._id": 0 }
  }];

  let baggageComparison = [{
    $lookup: {
      from: "baggagecomparisons",
      localField: "comparisonId",
      foreignField: "_id",
      as: "comparison"
    }
  }, {
    $unwind: {
      path: "$comparison",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $project: { "comparison._id": 0 }
  }];

  return await get(query, [
    ...transportationState,
    ...formerScan,
    ...latterScan,
    ...baggageComparison,
    ...filter
  ]);
}

async function getOnePublic(query, filter) {
  return (await getPublic(query, filter))[0] || null;
}

async function getOnePublicByUId(uId) {
  return await getOnePublic({ uId });
}

async function getFormerScanById(id) {
  return (await getOnePublic({
    _id: new mongoose.Types.ObjectId(id)
  }, [{
    $project: { formerScan: 1 }
  }])).formerScan;
}

async function getAllActive() {
  try {
    let baggageStateId = (await schemas.BaggageTransportationState.findOne({
      index: 4
    }))._id;

    return await getPublic({
      transportationStateId: { $ne: new mongoose.Types.ObjectId(baggageStateId) }
    })
  } catch (error) {
    throw ServerError.customError("getAllActive_baggage", error);
  }
}

async function getAllActiveByUserId(id) {
  try {
    let baggageStateId = (await schemas.BaggageTransportationState.findOne({
      index: 4
    }))._id;

    let passport = (await schemas.User.findOne({ _id: id })).passport;

    return await getPublic({
      passport,
      transportationStateId: { $ne: new mongoose.Types.ObjectId(baggageStateId) }
    })
  } catch (error) {
    throw ServerError.customError("getAllActiveByUserId_baggage", error);
  }
}

async function getAllHistory() {
  try {
    let baggageStateId = (await schemas.BaggageTransportationState.findOne({
      index: 4
    }))._id;

    return await getPublic({
      transportationStateId: new mongoose.Types.ObjectId(baggageStateId)
    });
  } catch (error) {
    throw ServerError.customError("getAllHistory_baggage", error);
  }
}

async function getAllHistoryByUserId(id) {
  try {
    let baggageStateId = (await schemas.BaggageTransportationState.findOne({
      index: 4
    }))._id;

    let passport = (await schemas.User.findOne({ _id: id })).passport;

    return await getPublic({
      passport,
      transportationStateId: new mongoose.Types.ObjectId(baggageStateId)
    });
  } catch (error) {
    throw ServerError.customError("getAllHistoryByUserId_baggage", error);
  }
}

async function updateStateById({ id, transportationStateId }) {
  try {
    let isValid = await schemas.BaggageTransportationState.findById(transportationStateId);

    if (!isValid)
      throw new ServerError(serverErrors.BAGGAGE__WRONG_STATE);

    let result = await schemas.Baggage.updateOne({ _id: id }, { transportationStateId });

    return result.ok === result.n;
  } catch (error) {
    throw ServerError.customError("updateStateById_baggage", error);
  }
}

async function latterScanById({ id, ...latterScanData }) {
  try {
    let stateId = (await baggageStateActions.getFinalState())._id,
      formerScan = await getFormerScanById(id),
      summary = round((formerScan.summary + latterScanData.summary) / 2, 100),
      uId, comparisonUId;

    do {
      uId = keyGenerator();
      comparisonUId = await schemas.BaggageComparison.findOne({ uId });
    } while (comparisonUId);

    let comparison = new schemas.BaggageComparison({
      uId,
      name: summary,
      describe: "No further destructions spotted"
    });
    let comparisonResult = await comparison.save();

    let latterScan = new schemas.Scan(latterScanData);
    let latterScanResult = await latterScan.save();

    let result = await schemas.Baggage.updateOne({ _id: id }, {
      transportationStateId: new mongoose.Types.ObjectId(stateId),
      latterScanId: latterScanResult._id,
      comparisonId: comparisonResult._id,
      summary
    });

    return result.ok === result.n;
  } catch (error) {
    console.log(error)
    throw ServerError.customError("latterScanById_baggage", error);
  }
}

module.exports = {
  add,
  get,
  getPublic,
  getOnePublic,
  getAllActive,
  getAllActiveByUserId,
  getOnePublicByUId,
  getFormerScanById,
  getAllHistory,
  getAllHistoryByUserId,
  updateStateById,
  latterScanById
};