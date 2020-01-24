import Connector from "./Connector";

export default class BaggageState extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getList: pathStructure.getList = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  getList() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getList);
  }
}