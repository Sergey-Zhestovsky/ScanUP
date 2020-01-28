let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  PrivilegeController = require("../logic/classes/PrivilegeController"),
  Scan = require("../logic/classes/Scan"),
  Validator = require("../logic/classes/Validator"),
  verifyScanVconf = require("../logic/data/validationConfigs/verifyScan"),
  scanOperationVconf = require("../logic/data/validationConfigs/scanOperation"),
  ScannerBrocker = require("../logic/classes/ScannerBrocker");

let verifyScanValidator = new Validator({ ...verifyScanVconf, ...scanOperationVconf });
let scanOperationValidator = new Validator(scanOperationVconf);

let scannerBrocker = new ScannerBrocker();

router.all('*', function (req, res, next) {
  return next();
});

router.post('/get', async function (req, res, next) {
  let data = req.body,
    isValid = scanOperationValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  return serverAnswer.default(dbAPI.scanner.getScannerByUId(data.uId), res);
});

router.post('/scan', function (req, res, next) {
  let data = req.body,
    isValid = scanOperationValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  scannerBrocker.request(data.uId, async function (responseAnswer) {
    let scan = await Scan.create(),
      scanPublic = await scan.GetWithSource();

    responseAnswer.add(scanPublic.public);

    return res.send(serverAnswer(null, scanPublic));
  }, res);
});

router.post('/IoT-scanning', function (req, res, next) {
  let data = req.body,
    isValid = scanOperationValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  scannerBrocker.response(data.uId, (answer) => {
    if (answer === null)
      return res.send(serverAnswer(serverAnswer.ERRORS.SCANNER__IOT_NO_REQUESTS));

    return res.send(serverAnswer(null, answer));
  });
});

router.post('/verify-scan', async function (req, res, next) {
  let data = req.body,
    isValid = verifyScanValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  scannerBrocker.request(data.uId, async function (responseAnswer) {
    let formerScan = await dbAPI.baggage.getFormerScanById(data.id),
      scan = new Scan(formerScan),
      scanPublic = await scan.verify().GetWithSource();

    responseAnswer.add(scanPublic.public);

    return res.send(serverAnswer(null, scanPublic));
  }, res);
});

module.exports = router;