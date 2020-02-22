let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  Validator = require("../logic/classes/Validator"),
  authVConfig = require("../logic/data/validationConfigs/authorization"),
  registrationVConfig = require("../logic/data/validationConfigs/registration"),
  isRegisteredVConfig = require("../logic/data/validationConfigs/isRegistered");

let authValidator = new Validator(authVConfig);
let registrationValidator = new Validator(registrationVConfig);
let isRegisteredValidator = new Validator(isRegisteredVConfig);

router.post('/is-registered', function (req, res, next) {
  let data = req.body,
    isValid = isRegisteredValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  dbAPI.user.isExists(data)
    .then((answer) => {
      let result = !!answer.passport;

      return res.send(serverAnswer(null, result));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

router.post('/signup', async function (req, res, next) {
  let userData = req.body,
    isValid = registrationValidator.validate(userData);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  try {
    let user = await dbAPI.user.add(userData),
      session = req.data.user;

    await session.login(user._id, user.privilegeId);

    return res.send(serverAnswer(null, user));
  } catch (error) {
    return res.send(serverAnswer(error));
  }
});

router.post('/login', async function (req, res, next) {
  let userData = req.body,
    isValid = authValidator.validate(userData);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  try {
    let user = await dbAPI.user.authorize(userData),
      session = req.data.user;

    await session.login(user._id, user.privilegeId);

    return res.send(serverAnswer(null, user));
  } catch (error) {
    return res.send(serverAnswer(error));
  }
});

router.post('/mobile-login', async function (req, res, next) {
  let userData = req.body,
    isValid = authValidator.validate(userData);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  try {
    //let user = await dbAPI.user.authorize(userData),
    //  session = req.data.user;

    //await session.login(user._id, user.privilegeId);

    // auth = new Authorization({ request: req, response: res }),
    // token = await auth.login({
    //   id: user._id,
    //   privilege: user.privilegeId
    // }).token;

    //return res.send(serverAnswer(null, { token, details: user }));
    return res.send(serverAnswer(false));
  } catch (error) {
    return res.send(serverAnswer(error));
  }
});

router.all('*', function (req, res, next) {
  if (!req.data.user)
    return res.send(serverAnswer(serverAnswer.ERRORS.PRIVILEGE__BLOCKED));

  return next();
});

router.post('/logout', async function (req, res, next) {
  req.data.user.logout();

  return res.send(serverAnswer(null, true));
});

router.post('/user', function (req, res, next) {
  let user = req.data.user.getUser();

  return serverAnswer.default(
    dbAPI.user.getUserPublicDataByPrivilegeId(user.id, user.privilege),
    res
  );
});

module.exports = router;