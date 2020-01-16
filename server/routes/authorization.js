let express = require("express"),
  router = express.Router(),
  Authorization = require("../logic/classes/Authorization"),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  Validator = require("../logic/classes/Validator"),
  authValidationConfig = require("../logic/data/validationConfigs/authorization");

let authValidator = new Validator(authValidationConfig);

router.all('*', function (req, res, next) {
  return next();
});

router.post('/logout', function (req, res, next) {
  let auth = new Authorization({ request: req, response: res });

  auth.logout();

  return res.send(serverAnswer(null, true));
});

router.post('/login', function (req, res, next) {
  let user = req.body,
    isValid = authValidator.validate(user);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  dbAPI.user.authorize(user)
    .then((user) => {
      let auth = new Authorization({ request: req, response: res });

      auth.login(user);

      return res.send(serverAnswer(null, user));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

router.post('/user', function (req, res, next) {
  let userId = req.data.user.getUser().id;

  dbAPI.user.getPublicData(userId)
    .then((user) => {
      return res.send(serverAnswer(null, user));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

module.exports = router;