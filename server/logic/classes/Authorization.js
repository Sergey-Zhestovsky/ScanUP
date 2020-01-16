let config = require("../../config"),
  User = require("./User");

const SESSION_COOKIE_NAME = config.session.identification["session_name"];
const SESSION_EXPIRES_TIME = config.session.identification["expires_time"];

class Authorization {
  constructor({ request, response }) {
    this.request = request;
    this.response = response;
  }

  async verify() {
    let authToken = this.request.cookies[SESSION_COOKIE_NAME];

    if (!authToken)
      return this.logout();

    let user = new User({
      token: authToken
    });

    try {
      await user.verifyToken();
      this.request.data.user = user;
    } catch (err) {
      this.logout();
    }

    return true;
  }

  logout() {
    return this.response.cookie(SESSION_COOKIE_NAME, null, { expires: new Date(0) });
  }

  login({ id, privilege }) {
    let user = new User({
      id,
      privilege
    }),
      token = user.setToken();

    this.response.cookie(SESSION_COOKIE_NAME, token, {
      expires: new Date(Date.now() + SESSION_EXPIRES_TIME)
    });

    this.request.data.user = user;
  }
}

module.exports = Authorization;