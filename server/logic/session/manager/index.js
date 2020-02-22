let cookieControllers = require("./cookieControllers"),
  SessionBuilder = require("./Session"),
  Storage = require("./Storage");

const SESSION_NAME = "SID";
const TOKEN_NAME = "TID";
const MAX_AGE = 315360000000;

class SessionManager {
  constructor({ storage, secret, sessionType, cookie } = {}) {
    if (!storage || !secret)
      throw new Error("Required configuration properties not provided.");

    this.storage = new Storage(storage);
    this.secret = secret;
    this.sessionType = sessionType || SessionManager.Type.Default;
    this.cookie = {
      sessionName: cookie.sessionName || SESSION_NAME,
      tokenName: cookie.tokenName || TOKEN_NAME,
      maxAge: cookie.maxAge || MAX_AGE
    };
  }

  static get Type() {
    return {
      Default: 1,
      Secure: 2
    }
  }

  createMiddleware() {
    let CookieController = sessionTypes[this.sessionType];

    return async (req, res, next) => {
      let Session = SessionBuilder(new CookieController(req, res, this), this.storage);

      req.session = await Session.init();

      next();
    }
  }

  clearSessions() {
    this.storage.clear();
  }
}

const sessionTypes = {
  [SessionManager.Type.Default]: cookieControllers.default,
  [SessionManager.Type.Secure]: cookieControllers.secure
};

module.exports = SessionManager;