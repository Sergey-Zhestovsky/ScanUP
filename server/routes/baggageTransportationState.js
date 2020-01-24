let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API");

router.all('*', function (req, res, next) {
  return next();
});

router.post('/get-list', function (req, res, next) {
  return serverAnswer.default(
    Promise.all([
      dbAPI.baggageTransportationState.getList(),
      dbAPI.baggageTransportationState.getFinalState()
    ]).then(([list, finalState]) => ({ list, finalState })), res);
});

module.exports = router;