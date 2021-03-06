let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  Validator = require("../logic/classes/Validator"),
  addTSVconf = require("../logic/data/validationConfigs/addTransportSystem");

let deleteValidator = new Validator({
  id: ["required"]
});

router.all('*', function (req, res, next) {
  return next();
});

router.post('/get-all', function (req, res, next) {
  return serverAnswer.default(dbAPI.transportSystem.getPublic(), res);
});

router.post('/get-statistics', function (req, res, next) {
  return serverAnswer.default(dbAPI.transportSystem.getStatistics(), res);
});

router.post('/add', function (req, res, next) {
  let data = req.body,
    validationConf = data.selfControl
      ? { ...addTSVconf.default, ...addTSVconf.moderator }
      : addTSVconf.default,
    adTSValidator = new Validator(validationConf),
    isValid = adTSValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  return serverAnswer.default(dbAPI.transportSystem.add(data), res);
});

router.post('/delete', function (req, res, next) {
  let data = req.body,
    isValid = deleteValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  return serverAnswer.default(dbAPI.transportSystem.deleteOne(data.id), res);
});

module.exports = router;