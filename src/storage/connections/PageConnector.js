import Connector, { ResponseType } from "./Connector";

export default class Page extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({
      signRequests,
      responseType: ResponseType.text,
      axiosConfig: { method: "get" }
    });

    ({
      root: pathStructure.root = "",
      about: pathStructure.about = "",
      policy: pathStructure.policy = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  about() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.about);
  }

  policy() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.policy);
  }
}