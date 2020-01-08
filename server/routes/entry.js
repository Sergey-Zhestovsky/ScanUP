let express = require("express"),
  router = express.Router();

router.all('*', function (req, res, next) {
  console.log("req \t", req.body)
  new Promise((resolve, reject) => {
    req.data = {};
  })
    .then(next)
    .catch((error) => {
      return res.header("Connection", "close").destroy();
    });
});

module.exports = router;