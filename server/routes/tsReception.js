let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  PrivilegeController = require("../logic/classes/PrivilegeController"),
  Validator = require("../logic/classes/Validator"),
  addTSReceptionVconf = require("../logic/data/validationConfigs/addTSReception"),
  getTSReceptionByIdVconf = require("../logic/data/validationConfigs/getTSReceptionById");

let addReceptionByAdminValidator = new Validator(addTSReceptionVconf.globalAdministrator);
let addReceptionByModeratorValidator = new Validator(addTSReceptionVconf.globalModerator);
let getTSReceptionByIdValidator = new Validator(getTSReceptionByIdVconf);

router.all('*', function (req, res, next) {
  return next();
});

router.post('/add', async function (req, res, next) {
  let data = req.body,
    user = req.data.user.getUser();

  try {
    let privilegeIndex = (await dbAPI.privilege.getPrivilegeById(user.privilege)).index;

    switch (privilegeIndex) {
      case "01": return globalAdministratorAction(data);
      case "02": return globalModeratorAction(data);
      default: return res.send(serverAnswer(serverAnswer.ERRORS.PRIVILEGE__BLOCKED));
    }
  } catch (error) {
    return res.send(serverAnswer(error));
  }

  function globalModeratorAction(data) {
    let isValid = addReceptionByModeratorValidator.validate(data);

    if (isValid !== true)
      return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

    return serverAnswer.default(
      dbAPI.tsReception.addByGlobalModeratorId(data, user.id),
      res
    );
  }

  function globalAdministratorAction(data) {
    let isValid = addReceptionByAdminValidator.validate(data);

    if (isValid !== true)
      return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

    return serverAnswer.default(dbAPI.tsReception.add(data), res);
  }
});

router.post('/get-empty', async function (req, res, next) {
  let data = req.body,
    user = req.data.user.getUser();

  return PrivilegeController.switch(user.privilege, {
    "01": globalAdministratorAction,
    "02": globalModeratorAction
  }, res)

  function globalModeratorAction() {
    return serverAnswer.default(
      dbAPI.tsReception.getFreeReceptionsByGlobalModeratorId(user.id),
      res
    );
  }

  function globalAdministratorAction() {
    let isValid = getTSReceptionByIdValidator.validate(data);

    if (isValid !== true)
      return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

    return serverAnswer.default(
      dbAPI.tsReception.getFreeReceptionsByTSId(data.id),
      res
    );
  }
});

router.post('/get-all', function (req, res, next) {
  let user = req.data.user.getUser();

  return serverAnswer.default(
    dbAPI.tsReception.getReceptionsByGlobalModeratorId(user.id),
    res
  );
});

module.exports = router;