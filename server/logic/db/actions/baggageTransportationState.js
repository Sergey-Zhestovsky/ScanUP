let mongoose = require("../connect"),
  schemas = require("../models"),
  { ServerError, serverErrors } = require("../../classes/ServerError");


async function get(query = {}, filter = []) {
  query = query instanceof Object ? query : {};
  filter = filter instanceof Array ? filter : [filter];

  try {
    return await schemas.BaggageTransportationState.aggregate([{
      $match: query
    },
    ...filter]);
  } catch (error) {
    throw ServerError.customError("get_baggageTransportationState", error);
  }
}

async function getList() {
  const indexes = [4];

  return await get({
    index: { $nin: indexes }
  });
}

async function getFinalState() {
  return (await get({ index: 4 }))[0] || null;
}

module.exports = {
  get,
  getList,
  getFinalState
};