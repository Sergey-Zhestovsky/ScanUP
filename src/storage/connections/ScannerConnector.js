import Connector from "./Connector";

export default class Scanner extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      scan: pathStructure.scan = "",
      verifyScan: pathStructure.verifyScan = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  scan(data) {
    let path = this.pathStructure;

    return super.request(path.root + path.scan, data);
  }

  verifyScan(data) {
    let path = this.pathStructure;

    return super.request(path.root + path.verifyScan, data);
  }
}