import Connector from "./Connector";

export default class TSReception extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      add: pathStructure.add = "",
      addToTS: pathStructure.addToTS = "",
      getByTSId: pathStructure.getByTSId = "",
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

  getByTSId(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getByTSId, data);
  }

  getAll() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getAll);
  }
}