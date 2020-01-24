import Connector from "./Connector";

export default class Baggage extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      add: pathStructure.add = "",
      get: pathStructure.get = "",
      getAll: pathStructure.getAll = "",
      getHistory: pathStructure.getHistory = "",
      updateState: pathStructure.updateState = "",
      updateLatterScan: pathStructure.updateLatterScan = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  add(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.add, data);
  }

  get(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.get, data);
  }

  getAll() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getAll);
  }

  getHistory() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getHistory);
  }

  updateState(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.updateState, data);
  }

  updateLatterScan(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.updateLatterScan, data);
  }
}