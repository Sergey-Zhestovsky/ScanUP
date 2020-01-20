let mongoose = require("../connect"),
  schemas = require("../models"),
  { ServerError, serverErrors } = require("../../classes/ServerError");

async function get(query = {}, filter = []) {
  query = query instanceof Object ? query : {};
  filter = filter instanceof Array ? filter : [filter];

  try {
    return await schemas.Privilege.aggregate([{
      $match: query
    },
    ...filter]);
  } catch (error) {
    throw ServerError.customError("get_privilege", error);
  }
}

async function getPrivilegeById(id) {
  return (await get({ _id: new mongoose.Types.ObjectId(id) }))[0] || null;
}

async function getPrivilegeByIndex(index) {
  return (await get({ index }))[0] || null;
}

module.exports = {
  get,
  getPrivilegeById,
  getPrivilegeByIndex
};