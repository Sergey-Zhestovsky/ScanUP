let express = require("express"),
  router = express.Router(),
  serverAnswer = require("../logic/modules/serverAnswer"),
  dbAPI = require("../logic/db/API");

router.all('*', function (req, res, next) {
  return next();
});

router.post('/get-all', function (req, res, next) {
  dbAPI.tsType.getAll()
    .then((types) => {
      return res.send(serverAnswer(null, types));
    })
    .catch((error) => {
      return res.send(serverAnswer(error));
    });
});

module.exports = router;