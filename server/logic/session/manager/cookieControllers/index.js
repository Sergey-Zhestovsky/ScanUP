let DefaultCookieController = require("./DefaultCookieController"),
  SecureCookieController = require("./SecureCookieController");

module.exports = {
  default: DefaultCookieController,
  secure: SecureCookieController
};