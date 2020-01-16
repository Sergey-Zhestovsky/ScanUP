let mongoose = require("../connect"),
  schemas = require("../models"),
  { ServerError, serverErrors } = require("../../classes/ServerError");

async function add(data) {
  let user = new schemas.User(data),
    responce;

  try {
    let isUserExists = await isExists({ email: data.email, passport: data.passport });

    if (isUserExists.email)
      return new ServerError(serverErrors.USER_REGISTRATION__EMAIL_EXISTS).reject();
    if (isUserExists.passport)
      return new ServerError(serverErrors.USER_REGISTRATION__PASSPORT_EXISTS).reject();

    responce = await user.save();
    responce = await getPublicData(responce._id);
  } catch (error) {
    return ServerError.customError("add_user", error).reject();
  }

  return responce;
}

async function get(data) {
  let user;

  try {
    user = await schemas.User.findOne(data);
  } catch (error) {
    return ServerError.customError("get_user", error).reject();
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
    return ServerError.customError("isExists_user", error).reject();
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
      return new ServerError(serverErrors.USER_AUTHORIZATION__WRONG_DATA).reject();

    user = new schemas.User(user);

    if (user.checkPassword(password))
      return await getPublicData(user._id);

    return new ServerError(serverErrors.USER_AUTHORIZATION__WRONG_DATA).reject();
  } catch (error) {
    return ServerError.customError("authorize_user", error).reject();
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
      return new ServerError(serverErrors.USER_GET__NO_USER).reject();
  } catch (error) {
    return ServerError.customError("getPublicData_user", error).reject();
  }

  return user[0];
}

module.exports = {
  add,
  get,
  isExists,
  authorize,
  getPublicData
};