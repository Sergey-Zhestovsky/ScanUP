import Connector from "./Connector";

export default class Authorisation extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      logout: pathStructure.logout = "",
      login: pathStructure.login = "",
      getDetails: pathStructure.getDetails = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  logout() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.logout);
  }

  login(user) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.login, user);
  }

  getDetails() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getDetails);
  }
}