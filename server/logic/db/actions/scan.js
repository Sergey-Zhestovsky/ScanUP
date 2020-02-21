let mongoose = require("../connect"),
  schemas = mongoose.models,
  { ServerError } = require("../../classes/ServerError");


async function getDescriptionSample(size) {
  const sample = [{ $sample: { size } }];

  try {
    let placeSample = await schemas.ScanPlaceDescription.aggregate(sample);
    let typeSample = await schemas.ScanTypeDescription.aggregate(sample);

    return {
      placeDescription: placeSample,
      typeDescription: typeSample
    };
  } catch (error) {
    throw ServerError.customError("getDescriptionSample_scan", error);
  }
}

async function getDescriptionsByIndex(placesArray, typesArray) {
  try {
    let placeSample = await schemas.ScanPlaceDescription.aggregate([{
      $match: { index: { $in: placesArray } }
    }, {
      $project: { "_id": 0 }
    }]);
    let typeSample = await schemas.ScanTypeDescription.aggregate([{
      $match: { index: { $in: typesArray } }
    }, {
      $project: { "_id": 0 }
    }]);

    return {
      placeDescription: placeSample,
      typeDescription: typeSample
    };
  } catch (error) {
    throw ServerError.customError("getDescriptionsByIndex_scan", error);
  }
}

module.exports = {
  getDescriptionSample,
  getDescriptionsByIndex
};