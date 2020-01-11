let config = require("../../config"),
  jwt = require("jsonwebtoken"),
  { ServerError, serverErrors } = require("./ServerError");

const ENCODE_SERVER_KEY = config["encode_server_key"];

class User {
  constructor({ token, id, privilege }) {
    this.token = token;
    this.id = id;
    this.privilege = privilege;
  }

  getUser() {
    return {
      id: this.id,
      privilege: this.privilege
    }
  }

  getToken() {
    return {
      token: this.token
    }
  }

  setToken() {
    if (!this.id || !this.privilege) // TODO VERIFICATION
      throw new ServerError(serverErrors.USER__VALIDATION_MISSING_DATA);

    this.token = jwt.sign(JSON.stringify(this.getUser()), ENCODE_SERVER_KEY);

    return this.token;
  }

  async verifyToken() {
    if (!this.token)
      throw new ServerError(serverErrors.USER__VALIDATION_TOKEN).reject();

    try {
      ({
        id: this.id,
        privilege: this.privilege
      } = jwt.verify(this.token, ENCODE_SERVER_KEY));
    } catch (err) {
      throw new ServerError(serverErrors.USER__BED_TOKEN).reject();
    }

    return true;
  }
}

module.exports = User;