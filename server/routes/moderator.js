let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  PrivilegeController = require("../logic/classes/PrivilegeController"),
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

  return serverAnswer.default(dbAPI.user.addModerator(data), res);
});

router.post('/get-all', async function (req, res, next) {
  let user = req.data.user.getUser();

  return PrivilegeController.switch(user.privilege, {
    "01": globalAdministratorAction,
    "02": globalModeratorAction
  }, res);

  function globalModeratorAction() {
    return serverAnswer.default(dbAPI.user.getModeratorsByGlobalModeratorId(user.id), res);
  }

  function globalAdministratorAction() {
    return serverAnswer.default(dbAPI.user.getModerators(), res);
  }
});

module.exports = router;