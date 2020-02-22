let mongoose = require("./mongoose"),
  schemas = mongoose.models,
  { ServerError, serverErrors } = require("../../classes/ServerError");

async function get(sid) {
  try {
    return (await schemas.Session.aggregate([{
      $match: { _id: sid }
    }, {
      $project: { _id: 0, sid: "$_id", uid: 1, data: 1 }
    }]))[0] || null;
  } catch (error) {
    throw ServerError.customError("get_session", error).reject();
  }
}

async function set(sid, uid, data) {
  try {
    let session = new schemas.Session({
      _id: sid, uid, data
    });

    await session.save();

    return true;
  } catch (error) {
    if (error.code === 11000) return false;

    throw ServerError.customError("set_session", error).reject();
  }
}

async function getUserSessions(uid) {
  try {
    return await schemas.Session.aggregate([{
      $match: { uid }
    }, {
      $project: { _id: 0, sid: "$_id", uid: 1, data: 1 }
    }]);
  } catch (error) {
    throw ServerError.customError("set_session", error).reject();
  }
}

async function remove(...sid) {
  try {
    return await schemas.Session.deleteMany({
      _id: { $in: sid }
    });
  } catch (error) {
    throw ServerError.customError("remove_session", error).reject();
  }
}

async function clear() {
  try {
    return await schemas.Session.remove({});
  } catch (error) {
    throw ServerError.customError("clear_session", error).reject();
  }
}

module.exports = {
  get,
  set,
  getUserSessions,
  remove,
  clear
};