let express = require("express"),
  router = express.Router(),
  DataStorage = require("../logic/classes/DataStorage"),
  User = require("../logic/classes/User");

router.all('*', async function (req, res, next) {
  req.data = new DataStorage();

  try {
    await identification(req, res, next);
  } catch (error) {
    return res.header("Connection", "close").destroy();
  }

  return next();
});

async function identification(req, res, next) {
  req.data("user", new User(req.session));
}

module.exports = router;