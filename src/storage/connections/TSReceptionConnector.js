import Connector from "./Connector";

export default class TS extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      add: pathStructure.add = "",
      addToTS: pathStructure.addToTS = "",
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

  getAll() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getAll);
  }
}