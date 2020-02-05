let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  Scan = require("../logic/classes/Scan"),
  User = require("../logic/classes/User"),
  PrivilegeController = require("../logic/classes/PrivilegeController"),
  Validator = require("../logic/classes/Validator"),
  addBaggageVConfig = require("../logic/data/validationConfigs/addBaggage"),
  getBaggageVConfig = require("../logic/data/validationConfigs/getBaggage"),
  updateBaggageStateVconf = require("../logic/data/validationConfigs/updateBaggageState"),
  mobileGetBaggageVconf = require("../logic/data/validationConfigs/mobileGetBaggage"),
  updateBaggageLatterScanVconf = require("../logic/data/validationConfigs/updateBaggageLatterScan");

let updateBaggageStateValidator = new Validator(updateBaggageStateVconf);
let addBaggageValidator = new Validator(addBaggageVConfig);
let getBaggageValidator = new Validator(getBaggageVConfig);
let updateBaggageLatterScanValidator = new Validator(updateBaggageLatterScanVconf);
let mobileGetBaggageValidator = new Validator(mobileGetBaggageVconf);

router.post('/add', function (req, res, next) {
  let data = req.body,
    user = req.data.user.getUser(),
    isValid = addBaggageValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  return serverAnswer.default(
    dbAPI.baggage.add({ ...data, managerId: user.id }),
    res
  );
});

router.post('/get', async function (req, res, next) {
  let data = req.body,
    isValid = getBaggageValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  try {
    let baggage = await dbAPI.baggage.getOnePublicByUId(data.uId);

    if (baggage === null)
      return res.send(serverAnswer(serverAnswer.ERRORS.BAGGAGE__NOT_FOUND));

    if (baggage.formerScanId)
      baggage.formerScan = {
        ...baggage.formerScan,
        ...(await (new Scan(baggage.formerScan)).Get())
      };

    if (baggage.latterScanId)
      baggage.latterScan = {
        ...baggage.latterScan,
        ...(await (new Scan(baggage.latterScan)).Get())
      };

    return res.send(serverAnswer(null, baggage));
  } catch (error) {
    return res.send(serverAnswer(error));
  }
});

router.post('/get-all', function (req, res, next) {
  let user = req.data.user.getUser();

  return PrivilegeController.switch(user.privilege, {
    "03": moderatorAction,
    "04": userAction
  }, res);

  function moderatorAction() {
    return serverAnswer.default(
      dbAPI.baggage.getAllActive(),
      res
    );
  }

  function userAction() {
    return serverAnswer.default(
      dbAPI.baggage.getAllActiveByUserId(user.id),
      res
    );
  }
});

router.post('/mobile-get-all', function (req, res, next) {
  let data = req.body,
    isValid = mobileGetBaggageValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  let user = new User({
    token: data.token
  });
  user.verifyToken();

  return PrivilegeController.switch(user.privilege, {
    "03": moderatorAction,
    "04": userAction
  }, res);

  function moderatorAction() {
    return serverAnswer.default(
      dbAPI.baggage.getAllActive(),
      res
    );
  }

  function userAction() {
    return serverAnswer.default(
      dbAPI.baggage.getAllActiveByUserId(user.id),
      res
    );
  }
});

router.post('/get-history', function (req, res, next) {
  let user = req.data.user.getUser();

  return PrivilegeController.switch(user.privilege, {
    "03": moderatorAction,
    "04": userAction
  }, res);

  function moderatorAction() {
    return serverAnswer.default(
      dbAPI.baggage.getAllHistory(),
      res
    );
  }

  function userAction() {
    return serverAnswer.default(
      dbAPI.baggage.getAllHistoryByUserId(user.id),
      res
    );
  }
});

router.post('/update-state', function (req, res, next) {
  let data = req.body,
    isValid = updateBaggageStateValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  return serverAnswer.default(dbAPI.baggage.updateStateById(data), res);
});

router.post('/update-latter-scan', function (req, res, next) {
  let data = req.body,
    user = req.data.user.getUser(),
    isValid = updateBaggageLatterScanValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  return serverAnswer.default(dbAPI.baggage.latterScanById({ ...data, managerId: user.id }), res);
});

module.exports = router;