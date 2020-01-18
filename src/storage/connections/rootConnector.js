import AuthorizationConnector from "./AuthorizationConnector";
import TSTypesConnector from "./TSTypesConnector";
import TSConnector from "./TSConnector";
import TSReceptionConnector from "./TSReceptionConnector";

import config from "../../data/defaultConnectorConfig";

export const authConnector = new AuthorizationConnector(config.authConnector);
export const tsTypesConnector = new TSTypesConnector(config.tsTypesConnector);
export const tsConnector = new TSConnector(config.tsConnector);
export const tsReceptionConnector = new TSReceptionConnector(config.tsReceptionConnector);

export default {
  authConnector,
  tsTypesConnector,
  tsConnector,
  tsReceptionConnector
};