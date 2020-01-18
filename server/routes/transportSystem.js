let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  Validator = require("../logic/classes/Validator"),
  addTSVconf = require("../logic/data/validationConfigs/addTransportSystem");

let deelteValidator = new Validator({
  id: ["required"]
});

router.all('*', function (req, res, next) {
  return next();
});

router.post('/get-all', function (req, res, next) {
  dbAPI.transportSystem.get()
    .then((ts) => {
      return res.send(serverAnswer(null, ts));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
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

  dbAPI.transportSystem.add(data)
    .then((ts) => {
      return res.send(serverAnswer(null, ts));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

router.post('/delete', function (req, res, next) {
  let data = req.body,
    isValid = deelteValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  dbAPI.transportSystem.deleteOne(data.id)
    .then((answer) => {
      return res.send(serverAnswer(null, answer));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

module.exports = router;