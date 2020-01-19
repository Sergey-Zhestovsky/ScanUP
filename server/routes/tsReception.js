let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  Validator = require("../logic/classes/Validator"),
  addTSReceptionVconf = require("../logic/data/validationConfigs/addTSReception");
getTSReceptionByIdVconf = require("../logic/data/validationConfigs/getTSReceptionById");

let addTSReceptionValidator = new Validator(addTSReceptionVconf);
let getTSReceptionByIdValidator = new Validator(getTSReceptionByIdVconf);

router.all('*', function (req, res, next) {
  return next();
});

router.post('/add', function (req, res, next) {
  let data = req.body,
    isValid = addTSReceptionValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  dbAPI.tsReception.add(data)
    .then((answer) => {
      return res.send(serverAnswer(null, answer));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

router.post('/get-by-transport-system', function (req, res, next) {
  let data = req.body,
    isValid = getTSReceptionByIdValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  dbAPI.tsReception.getFreeReceptionsByTSId(data)
    .then((answer) => {
      return res.send(serverAnswer(null, answer));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

module.exports = router;