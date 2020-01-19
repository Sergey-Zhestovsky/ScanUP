let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
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
    let privilegeIndex = (await dbAPI.user.getPrivilegeById(user.privilege)).index;

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

    dbAPI.tsReception.addByGlobalModeratorId(data, user.id)
      .then((answer) => {
        return res.send(serverAnswer(null, answer));
      })
      .catch((error) => {
        return res.send(serverAnswer(error));
      });
  }

  function globalAdministratorAction(data) {
    let isValid = addReceptionByAdminValidator.validate(data);

    if (isValid !== true)
      return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

    dbAPI.tsReception.add(data)
      .then((answer) => {
        return res.send(serverAnswer(null, answer));
      })
      .catch((error) => {
        return res.send(serverAnswer(error));
      });
  }
});

router.post('/get-empty', async function (req, res, next) {
  let data = req.body,
    user = req.data.user.getUser();

  try {
    let privilegeIndex = (await dbAPI.user.getPrivilegeById(user.privilege)).index;

    switch (privilegeIndex) {
      case "01": return globalAdministratorAction(data);
      case "02": return globalModeratorAction();
      default: return res.send(serverAnswer(serverAnswer.ERRORS.PRIVILEGE__BLOCKED));
    }
  } catch (error) {
    return res.send(serverAnswer(error));
  }

  function globalModeratorAction() {
    dbAPI.tsReception.getFreeReceptionsByGlobalModeratorId(user.id, true)
      .then((answer) => {
        return res.send(serverAnswer(null, answer));
      })
      .catch((error) => {
        return res.send(serverAnswer(error));
      });
  }

  function globalAdministratorAction(data) {
    let isValid = getTSReceptionByIdValidator.validate(data);

    if (isValid !== true)
      return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

    dbAPI.tsReception.getFreeReceptionsByTSId(data)
      .then((answer) => {
        return res.send(serverAnswer(null, answer));
      })
      .catch((error) => {
        return res.send(serverAnswer(error));
      });
  }
});

router.post('/get-all', function (req, res, next) {
  let user = req.data.user.getUser();

  dbAPI.tsReception.getFreeReceptionsByGlobalModeratorId(user.id)
    .then((answer) => {
      return res.send(serverAnswer(null, answer));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

module.exports = router;