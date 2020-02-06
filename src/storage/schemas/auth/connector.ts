import Connector from "../../connections/Connector";
import { SignUpActionObject, LoginActionObject, IsRegisteredActionObject } from "./types";
import { ConnectorConstructor } from "../../connections/types";

interface AuthorizationPathStructure {
  root: string;
  logout: string;
  login: string;
  signup: string;
  getDetails: string;
  isRegistered: string;
}

export default class Authorization extends Connector {

  private pathStructure: AuthorizationPathStructure;

  constructor({ pathStructure, signRequests = false }:
    ConnectorConstructor<AuthorizationPathStructure>) {
    super({ signRequests });
    this.pathStructure = pathStructure;
  }

  logout() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.logout);
  }

  login(user: LoginActionObject) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.login, user);
  }

  signup(user: SignUpActionObject) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.signup, user);
  }

  getDetails() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getDetails);
  }

  isRegistered(data: IsRegisteredActionObject) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.isRegistered, data);
  }
}