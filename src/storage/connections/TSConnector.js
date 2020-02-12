import Connector from "./Connector";

export default class TS extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getAll: pathStructure.getAll = "",
      add: pathStructure.add = "",
      delete: pathStructure.delete = "",
      getStatistics: pathStructure.getStatistics = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  getAll() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getAll);
  }

  add(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.add, data);
  }

  delete(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.delete, data);
  }

  getStatistics() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getStatistics);
  }
}