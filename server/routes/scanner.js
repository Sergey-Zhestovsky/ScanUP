let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  PrivilegeController = require("../logic/classes/PrivilegeController"),
  Scan = require("../logic/classes/Scan"),
  Validator = require("../logic/classes/Validator"),
  verifyScanVconf = require("../logic/data/validationConfigs/verifyScan");

let verifyScanValidator = new Validator(verifyScanVconf);

router.all('*', function (req, res, next) {
  return next();
});

router.post('/scan', async function (req, res, next) {
  let scan = await Scan.create();

  return serverAnswer.default(scan.GetWithSource(), res);
});

router.post('/verify-scan', async function (req, res, next) {
  let data = req.body,
    isValid = verifyScanValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  let formerScan = await dbAPI.baggage.getFormerScanById(data.id),
    scan = new Scan(formerScan);

  return serverAnswer.default(scan.verify().GetWithSource(), res);
});

module.exports = router;