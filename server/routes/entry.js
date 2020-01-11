let express = require("express"),
  config = require("../config"),
  router = express.Router();

router.all('*', function (req, res, next) {
  new Promise((resolve, reject) => {
    req.data = {};

    resolve(req, res, next);
  })
    .then(identification)
    .catch((error) => {
      return res.header("Connection", "close").destroy();
    });
});

function identification(req, res, next) {
  let authToken = req.cookies[config.session.identification.session_name];

}

module.exports = router;