let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API"),
  PrivilegeController = require("../logic/classes/PrivilegeController"),
  Validator = require("../logic/classes/Validator"),
  addComplaintVconf = require("../logic/data/validationConfigs/addComplaint");

let addComplaintValidator = new Validator(addComplaintVconf);

router.all('*', function (req, res, next) {
  return next();
});

router.post('/add', function (req, res, next) {
  let data = req.body,
    isValid = addComplaintValidator.validate(data);

  if (isValid !== true)
    return res.send(serverAnswer(serverAnswer.ERRORS.VALIDATION__REQUIRED_DATA));

  return serverAnswer.default(dbAPI.complaint.addByScanId(data), res);
});

router.post('/get-all', function (req, res, next) {
  return serverAnswer.default(dbAPI.complaint.getPublic(), res);
});

module.exports = router;