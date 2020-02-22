class DataStorage {
  constructor() {
    function storage(name, value) {
      storage.storage.set(name, value);
    }

    storage.storage = new Map();

    let options = {
      get: (target, name) => {
        return target.storage.get(name);
      },
      set: () => { }
    };

    return new Proxy(storage, options);
  }
}

module.exports = DataStorage;

