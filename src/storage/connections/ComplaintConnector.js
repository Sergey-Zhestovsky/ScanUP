import Connector from "./Connector";

export default class Complaint extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      add: pathStructure.add = "",
      getAll: pathStructure.getAll = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  add(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.add, data);
  }

  getAll() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getAll);
  }
}