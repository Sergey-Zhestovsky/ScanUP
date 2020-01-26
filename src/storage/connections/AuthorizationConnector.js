import Connector from "./Connector";

export default class Authorisation extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      logout: pathStructure.logout = "",
      login: pathStructure.login = "",
      signup: pathStructure.signup = "",
      getDetails: pathStructure.getDetails = "",
      isRegistered: pathStructure.isRegistered = ""
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

  signup(user) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.signup, user);
  }

  getDetails() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getDetails);
  }

  isRegistered(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.isRegistered, data);
  }
}