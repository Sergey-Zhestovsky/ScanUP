let mongoose = require("../connect"),
  schemas = require("../models"),
  { ServerError, serverErrors } = require("../../classes/ServerError");

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
    responce = await getPublicData(responce._id);
  } catch (error) {
    throw ServerError.customError("add_user", error);
  }

  return responce;
}

async function removeGlobalModerator(id) {
  let responce;

  try {
    let privilege = await schemas.Privilege.findOne({ index: "02" });
    let user = await schemas.User.findOne({ _id: id, privilegeId: privilege._id });

    if (user === null)
      throw new ServerError(serverErrors.USER_REMOVE__BLOCKED);

    responce = await schemas.User.findByIdAndRemove(id);
  } catch (error) {
    throw ServerError.customError("add_user", error);
  }

  return responce;
}

async function get(data) {
  let user;

  try {
    user = await schemas.User.findOne(data);
  } catch (error) {
    throw ServerError.customError("get_user", error).reject();
  }

  return user;
}

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
    user = await get({ email });

    if (!user)
      throw new ServerError(serverErrors.USER_AUTHORIZATION__WRONG_DATA).reject();

    user = new schemas.User(user);

    if (user.checkPassword(password))
      return await getPublicData(user._id);

    throw new ServerError(serverErrors.USER_AUTHORIZATION__WRONG_DATA).reject();
  } catch (error) {
    throw ServerError.customError("authorize_user", error).reject();
  }
}

async function getPublicData(id) {
  let user;

  try {

    user = await schemas.User.aggregate([{
      $match: { _id: new mongoose.Types.ObjectId(id) }
    }, {
      $project: { _id: 0, id: "$_id", name: 1, email: 1, privilege: "$privilegeId" }
    }]);

    if (user.length === 0)
      throw new ServerError(serverErrors.USER_GET__NO_USER).reject();
  } catch (error) {
    throw ServerError.customError("getPublicData_user", error).reject();
  }

  return user[0];
}

module.exports = {
  add,
  get,
  isExists,
  authorize,
  getPublicData,
  removeGlobalModerator
};