let crypto = require("crypto"),
  serverErrors = require("../data/serverErrors");

class ServerError extends Error {
  constructor({ code, name }, source) {
    super(name);

    this.code = code;
    this.name = name;
    this.source = source;
    this.date = Date.now().toString();

    let hash = crypto.createHash("sha256"),
      hashDate = hash.update(this.date).digest("hex").slice(-8),
      hashSource = "";

    if (source) {
      let hash = crypto.createHash("sha256");

      source = typeof source === typeof {}
        ? JSON.stringify(source)
        : source.toString();
      hashSource = "-" + hash.update(source).digest("hex").slice(-12);
    }

    this.id = `${code}-${hashDate}${hashSource}`;
  }

  static customError(name, sourceError) {
    if (sourceError instanceof ServerError)
      return sourceError;

    return new ServerError({ code: "000", name }, sourceError);
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