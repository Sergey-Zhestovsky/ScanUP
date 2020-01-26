let express = require("express"),
  router = express.Router(),
  Authorization = require("../logic/classes/Authorization"),
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

router.post('/signup', function (req, res, next) {
  let user = req.body,
    isValid = registrationValidator.validate(user);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  dbAPI.user.add(user)
    .then((user) => {
      let auth = new Authorization({ request: req, response: res });

      auth.login({
        id: user._id,
        privilege: user.privilegeId
      });

      return res.send(serverAnswer(null, user));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

router.post('/login', function (req, res, next) {
  let user = req.body,
    isValid = authValidator.validate(user);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  dbAPI.user.authorize(user)
    .then((user) => {
      let auth = new Authorization({ request: req, response: res });

      auth.login({
        id: user._id,
        privilege: user.privilegeId
      });

      return res.send(serverAnswer(null, user));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

router.all('*', function (req, res, next) {
  if (!req.data.user)
    return res.send(serverAnswer(serverAnswer.ERRORS.PRIVILEGE__BLOCKED));

  return next();
});

router.post('/logout', function (req, res, next) {
  let auth = new Authorization({ request: req, response: res });

  auth.logout();

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