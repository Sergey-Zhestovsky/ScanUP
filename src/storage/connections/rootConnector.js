import AuthorizationConnector from "./AuthorizationConnector";

import config from "../../data/defaultConnectorConfig";

let authConnector = new AuthorizationConnector(config.authConnector);

export default {
  authConnector
};