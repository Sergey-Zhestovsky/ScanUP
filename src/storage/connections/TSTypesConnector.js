import Connector from "./Connector";

export default class TSTypes extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getAll: pathStructure.getAll = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  getAll() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getAll);
  }
}