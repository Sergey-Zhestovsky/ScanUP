let keyGenerator = require('uid-safe').sync;

function SessionBuilder(cookieController, storage) {
  return class Session extends SessionController {
    constructor(sid, uid, data) {
      super(cookieController, storage);
      this.sid = sid || null;
      this.uid = uid || null;
      this.data = data || null;
    }

    static async init() {
      let session = await SessionController.init(cookieController, storage);

      if (!session) return new Session();
      return new Session(session.sid, session.uid, session.data);
    }

    async create(uid, data) {
      if (this.sid) return;

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
      if (!this.sid) return false;

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

    async removeOtherSessions() {
      let sessions = await this.getUserSessions();

      return await super.remove(...sessions);
    }
  }
}

class SessionController {
  constructor(cookieController, storage) {
    this.cookieController = cookieController;
    this.storage = storage;
  }

  static async init(cookieController, storage) {
    let sid = cookieController.init(), storageAnswer;

    if (!sid) return null;
    storageAnswer = await storage.get(sid);
    if (!storageAnswer) cookieController.clearCookies();

    return storageAnswer;
  }

  async set(sid, uid, data) {
    let answer = await this.storage.set(sid, uid, data);

    if (!answer) return false;
    this.cookieController.setCookies(data, sid);

    return true;
  }

  async remove(...sid) {
    await this.storage.remove(...sid);
    this.cookieController.clearCookies();
  }
}

module.exports = SessionBuilder;