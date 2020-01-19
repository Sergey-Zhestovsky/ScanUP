let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  Validator = require("../logic/classes/Validator"),
  addModeratorVconf = require("../logic/data/validationConfigs/addModerator");

let addModeratorValidator = new Validator(addModeratorVconf);

router.all('*', function (req, res, next) {
  return next();
});

router.post('/add', function (req, res, next) {

  let data = req.body,
    isValid = addModeratorValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  dbAPI.user.addModerator(data)
    .then((answer) => {
      return res.send(serverAnswer(null, answer));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

router.post('/get-all', function (req, res, next) {
  dbAPI.user.getAllModerators()
    .then((answer) => {
      return res.send(serverAnswer(null, answer));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

module.exports = router;