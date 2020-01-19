import Connector from "./Connector";

export default class TSReception extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      add: pathStructure.add = "",
      addToTS: pathStructure.addToTS = "",
      getEmpty: pathStructure.getEmpty = "",
      getAll: pathStructure.getAll = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  add(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.add, data);
  }

  addToTS(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.addToTS, data);
  }

  getEmpty(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getEmpty, data);
  }

  getAll() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getAll);
  }
}