let express = require("express"),
  config = require("../config"),
  router = express.Router(),
  Authorization = require("../logic/classes/Authorization");

router.all('*', async function (req, res, next) {
  req.data = {};

  try {
    await identification(req, res, next);
  } catch (error) {
    return res.header("Connection", "close").destroy();
  }

  return next();
});

async function identification(req, res, next) {
  let auth = new Authorization({ request: req, response: res });

  return await auth.verify();
}

module.exports = router;