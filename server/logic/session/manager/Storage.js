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

module.exports = Storage;