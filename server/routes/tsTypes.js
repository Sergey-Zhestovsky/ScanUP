let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API");

router.all('*', function (req, res, next) {
  return next();
});

router.post('/get-all', function (req, res, next) {
  return serverAnswer.default(dbAPI.tsType.getAll(), res);
});

module.exports = router;