let jwt = require("jsonwebtoken"),
  keyGenerator = require('uid-safe').sync,
  { ServerError, serverErrors } = require("../../classes/ServerError"); // !

const SESSION_NAME = "SID";
const TOKEN_NAME = "TID";
const MAX_AGE = 315360000000;

class SessionManager {
  constructor({ storage, secret, sessionType, cookie } = {}) {
    if (!storage || !secret)
      throw new Error("Required configuration properties not provided.");

    this.storage = new Storage(storage);
    this.secret = secret;
    this.sessionType = sessionType ?? SessionManager.Type.Default;
    this.cookie = {
      sessionName: cookie.sessionName = SESSION_NAME,
      tokenName: cookie.tokenName = TOKEN_NAME,
      maxAge: cookie.maxAge = MAX_AGE
    };
  }

  static get Type() {
    return {
      Default: Symbol("Default"),
      Secure: Symbol("Secure")
    }
  }

  createMiddleware() {
    let CookieController = sessionTypes[this.sessionType];

    return (req, res, next) => {
      req.session = SessionBuilder(new CookieController(req, res, this), this.storage);
      next();
    }
  }

  clearSessions() {
    this.storage.clear();
  }
}

function SessionBuilder(cookieController, storage) {
  return class Session extends SessionController {
    constructor(sid, uid, data) {
      super(cookieController, storage);
      this.sid = sid ?? null;
      this.uid = uid ?? null;
      this.data = data ?? null;
    }

    static async init() {
      let session = await SessionController.init(cookieController, storage);

      if (!session)
        return new Session();

      return new Session(session.sid, session.uid, session.data);
    }

    async create(uid, data) {
      let sid, answer = false;

      do {
        sid = keyGenerator(24);
        answer = await super.set(sid, uid, data);
      } while (!answer);

      this.sid = sid;
      this.uid = uid;
      this.data = data;
    }

    async save() {
      if (!this.sid)
        return false;

      try {
        await super.set(this.sid, this.uid, this.data);
        return true;
      } catch (error) {
        return false;
      }
    }

    async remove() {
      if (!this.sid)
        return;

      await super.remove(this.sid);
      this.sid = null;
      this.uid = null;
      this.data = null;
    }

    async getUserSessions() {
      return await storage.getUserSessions(this.uid);
    }
  }
}

class SessionController {
  constructor(cookieController, storage) {
    this.cookieController = cookieController;
    this.storage = storage;
  }

  static async init(cookieController, storage) {
    let sid = cookieController.init();

    return await storage.get(sid);
  }

  async set(sid, uid, data) {
    await this.storage.set(sid, uid, data);
    this.cookieController.setCookies(data, sid);
  }

  async remove(sid) {
    await this.storage.remove(sid);
    this.cookieController.clearCookies();
  }
}

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
    let { publicToken, sessionToken } = this.Cookies;

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

  get Cookies() {
    let publicToken = this.request.cookies[this.sessionManager.cookie.tokenName],
      sessionToken = this.request.cookies[this.sessionManager.cookie.sessionName];

    try {
      sessionToken = jwt.verify(sessionToken, this.sessionManager.secret);
    } catch (err) {
      throw new ServerError(serverErrors.USER__BED_TOKEN);
    }

    return {
      publicToken,
      sessionToken
    };
  }

  setCookies(publicData = keyGenerator(8), sid) {
    let publicToken = jwt.sign(publicData, this.sessionManager.secret),
      sessionToken = jwt.sign(sid, publicToken, { noTimestamp: true }),
      signSessionToken = jwt.sign(sessionToken,
        this.sessionManager.secret, { noTimestamp: true });

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

class SecureSession {

}

class Storage {
  constructor(storage) {
    storage
      .then(answer => {
        this.storageInstance = answer;
        this.connected = true;
        this.verifyStorage();
      })
      .catch(error => {
        console.error("Session Storage: connection not established. Source: \n" + error);
      });

    this.storageInstance = null;
    this.connected = false;
  }

  verifyStorage() {
    let storage = this.storageInstance;

    if (!storage.get
      || !storage.set
      || !storage.getUserSessions
      || !storage.remove
      || !storage.clear
    ) {
      this.connected = false;
      console.error("Provided storage API not compatible with Session Storage.");
    }
  }

  get Connected() {
    return this.connected;
  }

  get(sid) {
    if (this.Connected)
      return this.storageInstance.get(sid);
  }

  set(sid, uid, data) {
    if (this.Connected)
      return this.storageInstance.set(sid, uid, data);
  }

  getUserSessions(uid) {
    if (this.Connected)
      return this.storageInstance.getUserSessions(uid);
  }

  remove(...sid) {
    if (this.Connected)
      return this.storageInstance.remove(...sid);
  }

  clear() {
    if (this.Connected)
      return this.storageInstance.clear();
  }
}

const sessionTypes = {
  [SessionManager.Type.Default]: DefaultCookieController,
  [SessionManager.Type.Secure]: SecureSession
}

module.exports = SessionManager;