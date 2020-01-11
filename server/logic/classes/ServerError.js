let crypto = require("crypto"),
  serverErrors = require("../data/serverErrors");

class ServerError extends Error {
  constructor({ code, name }, source) {
    this.code = code;
    this.name = name;
    this.source = source;
    this.date = Date.now();

    let hash = crypto.createHash("sha256"),
      hashDate = hash.update(date).slice(-8),
      hashSource = source ? `-${hash.update(source).slice(-8)}` : "";

    this.id = `${code}-${hashDate}${hashSource}`;
  }

  getOriginError() {
    return new Error(`${this.code}: ${this.name}`);
  }

  getError() {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      date: this.date
    }
  }

  getDevError() {
    return {
      ...this.getError(),
      source: this.source
    }
  }

  reject() {
    return Promise.reject(this);
  }
}

module.exports = { ServerError, serverErrors };