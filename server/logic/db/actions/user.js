let mongoose = require("../connect"),
  schemas = require("../models"),
  privilegeActions = require("./privilege"),
  { ServerError, serverErrors } = require("../../classes/ServerError");

async function isExists({ email, passport }) {
  let counter;

  try {
    counter = await schemas.User.aggregate([{
      $facet: {
        email: [{
          $match: { email }
        }, {
          $count: "count"
        }],
        passport: [{
          $match: { passport }
        }, {
          $count: "count"
        }]
      }
    }]);
  } catch (error) {
    throw ServerError.customError("isExists_user", error).reject();
  }

  counter = counter[0];
  counter = {
    email: counter.email[0] && counter.email[0].count || 0,
    passport: counter.passport[0] && counter.passport[0].count || 0
  };

  return counter;
}

async function authorize({ email, password }) {
  let user;

  try {
    user = await getOne({ email });

    if (!user)
      throw new ServerError(serverErrors.USER_AUTHORIZATION__WRONG_DATA).reject();

    user = new schemas.User(user);

    if (user.checkPassword(password))
      return await getOnePublicDataById(user._id);

    throw new ServerError(serverErrors.USER_AUTHORIZATION__WRONG_DATA).reject();
  } catch (error) {
    throw ServerError.customError("authorize_user", error).reject();
  }
}

async function add(data) {
  let user = new schemas.User(data),
    responce;

  try {
    let isUserExists = await isExists({ email: data.email, passport: data.passport });

    if (isUserExists.email)
      throw new ServerError(serverErrors.USER_REGISTRATION__EMAIL_EXISTS);
    if (data.passport && isUserExists.passport)
      throw new ServerError(serverErrors.USER_REGISTRATION__PASSPORT_EXISTS);

    responce = await user.save();
    responce = await getOnePublicDataById(responce._id);
  } catch (error) {
    throw ServerError.customError("add_user", error);
  }

  return responce;
}

async function addModerator(data) {
  try {
    let privilege = await privilegeActions.getPrivilegeByIndex("03");
    let user = await add({
      name: "Moderator",
      privilegeId: privilege._id,
      ...data
    });

    return await getModeratorById(user._id);
  } catch (error) {
    throw ServerError.customError("addModerator_user", error);
  }
}

async function get(query = {}, filter = []) {
  query = query instanceof Object ? query : {};
  filter = filter instanceof Array ? filter : [filter];

  try {
    return await schemas.User.aggregate([{
      $match: query
    },
    ...filter]);
  } catch (error) {
    throw ServerError.customError("get_user", error);
  }
}

async function getOne(query, filter) {
  return (await get(query, filter))[0] || null;
}

async function getPublicData(query, filter = []) {
  filter = filter instanceof Array ? filter : [filter];

  let publicFilter = {
    $project: { "salt": 0, "userPassword": 0 }
  },
    user = await get(query, [publicFilter, ...filter]);

  if (user.length === 0)
    throw new ServerError(serverErrors.USER_GET__NO_USER);

  return user;
}

async function getOnePublicData(query, filter) {
  return (await getPublicData(query, filter))[0] || null;
}

async function getOnePublicDataById(id) {
  return await getOnePublicData({
    _id: new mongoose.Types.ObjectId(id)
  });
}

async function getModerators(query = {}, filter = []) {
  query = query instanceof Object ? query : {};
  filter = filter instanceof Array ? filter : [filter];

  let privilege = await privilegeActions.getPrivilegeByIndex("03"),
    newQuery = {
      ...query,
      privilegeId: privilege._id
    },
    newFilter = [{
      $lookup: {
        from: "transportsystemreceptions",
        localField: "transportSystemReceptionId",
        foreignField: "_id",
        as: "transportSystemReception"
      }
    }, {
      $unwind: {
        path: "$transportSystemReception",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $project: { "transportSystemReceptionId": 0 }
    }, {
      $lookup: {
        from: "transportsystems",
        localField: "transportSystemReception.transportSystemId",
        foreignField: "_id",
        as: "transportSystem"
      }
    }, {
      $unwind: {
        path: "$transportSystem",
        preserveNullAndEmptyArrays: true
      }
    }, ...filter];

  return await getPublicData(newQuery, newFilter);
}

async function getModerator(query, filter) {
  return (await getModerators(query, filter))[0] || null;
}

async function getModeratorById(id) {
  return await getModerator({
    _id: new mongoose.Types.ObjectId(id)
  });
}

async function getModeratorsByGlobalModeratorId(id) {
  return await getModerators(null, [{
    $match: { "transportSystem.adminId": new mongoose.Types.ObjectId(id) }
  }]);
}

async function getGlobalModerators(query = {}, filter = []) {
  query = query instanceof Object ? query : {};
  filter = filter instanceof Array ? filter : [filter];

  let privilege = await privilegeActions.getPrivilegeByIndex("02"),
    newQuery = {
      ...query,
      privilegeId: privilege._id
    },
    newFilter = [{
      $lookup: {
        from: "transportsystems",
        localField: "_id",
        foreignField: "adminId",
        as: "transportSystem"
      }
    }, {
      $unwind: {
        path: "$transportSystem",
        preserveNullAndEmptyArrays: true
      }
    }, ...filter];

  return await getPublicData(newQuery, newFilter);
}

async function getGlobalModerator(query, filter) {
  return (await getGlobalModerators(query, filter))[0] || null;
}

async function getGlobalModeratorById(id) {
  return await getGlobalModerator({
    _id: new mongoose.Types.ObjectId(id)
  });
}

async function getUserPublicDataByPrivilegeId(userId, privilegeId) {
  let privilege = (await privilegeActions.getPrivilegeById(privilegeId)) || {};

  switch (privilege.index) {
    case "01": return await getOnePublicDataById(userId)
    case "02": return await getGlobalModeratorById(userId)
    case "03": return await getModeratorById(userId)
    case "04": return await getOnePublicDataById(userId)
    default: throw new ServerError(serverErrors.PRIVILEGE__BLOCKED);
  }
}

async function removeGlobalModerator(id) {
  let responce;

  try {
    let privilege = await privilegeActions.getPrivilegeByIndex("02"),
      user = await schemas.User.findOne({ _id: id, privilegeId: privilege._id });

    if (user === null)
      throw new ServerError(serverErrors.USER_REMOVE__BLOCKED);

    responce = await schemas.User.findByIdAndRemove(id);
  } catch (error) {
    throw ServerError.customError("removeGlobalModerator_user", error);
  }

  return responce;
}

module.exports = {
  isExists,
  authorize,
  add,
  addModerator,
  get,
  getOne,
  getPublicData,
  getOnePublicData,
  getOnePublicDataById,
  getModerators,
  getModerator,
  getModeratorById,
  getModeratorsByGlobalModeratorId,
  getGlobalModerators,
  getGlobalModerator,
  getGlobalModeratorById,
  getUserPublicDataByPrivilegeId,
  removeGlobalModerator,
};