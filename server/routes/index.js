let express = require("express"),
  router = express.Router();

router.all('*', function (req, res, next) {
  return next();
});

module.exports = router;