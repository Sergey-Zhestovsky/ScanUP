let jwt = require("jsonwebtoken"),
  keyGenerator = require('uid-safe').sync;

class DefaultCookieController {
  constructor(request, response, sessionManager) {
    this.request = request;
    this.response = response;
    this.sessionManager = sessionManager;
    this.cookieConfig = {
      expires: new Date(Date.now() + sessionManager.cookie.maxAge)
    };
  }

  init() {
    let { publicToken, sessionToken } = this.getCookies();

    if (!publicToken || !sessionToken) {
      this.clearCookies();
      return null;
    }

    let sid = this.verifySessionToken(sessionToken, publicToken);

    if (!sid) {
      this.clearCookies();
      return null;
    }

    return sid;
  }

  getCookies() {
    let publicToken = this.request.cookies[this.sessionManager.cookie.tokenName],
      sessionToken = this.request.cookies[this.sessionManager.cookie.sessionName];

    try {
      sessionToken = jwt.verify(sessionToken, this.sessionManager.secret);
    } catch (err) {
      sessionToken = null;
    }

    return {
      publicToken,
      sessionToken
    };
  }

  setCookies(publicData = keyGenerator(8), sid) {
    let publicToken = jwt.sign(publicData, this.sessionManager.secret, { noTimestamp: true }),
      sessionToken = jwt.sign(sid, publicToken),
      signSessionToken = jwt.sign(sessionToken, this.sessionManager.secret);

    this.response.cookie(this.sessionManager.cookie.tokenName,
      publicToken, this.cookieConfig);
    this.response.cookie(this.sessionManager.cookie.sessionName,
      signSessionToken, this.cookieConfig);
  }

  clearCookies() {
    this.response.cookie(this.sessionManager.cookie.tokenName, null, { expires: new Date(0) });
    this.response.cookie(this.sessionManager.cookie.sessionName, null, { expires: new Date(0) });
  }

  verifySessionToken(sessionToken, publicToken) {
    try {
      return jwt.verify(sessionToken, publicToken);
    } catch (err) {
      return false;
    }
  }
}

module.exports = DefaultCookieController;