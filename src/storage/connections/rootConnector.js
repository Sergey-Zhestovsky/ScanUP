import AuthorizationConnector from "./AuthorizationConnector";
import TSTypesConnector from "./TSTypesConnector";
import TSConnector from "./TSConnector";
import TSReceptionConnector from "./TSReceptionConnector";
import ModeratorConnector from "./ModeratorConnector";
import ScannerConnector from "./ScannerConnector";
import BaggageConnector from "./BaggageConnector";
import BaggageStateConnector from "./BaggageStateConnector";
import ComplaintConnector from "./ComplaintConnector";

import config from "../../data/defaultConnectorConfig";

export const authConnector = new AuthorizationConnector(config.authConnector);
export const tsTypesConnector = new TSTypesConnector(config.tsTypesConnector);
export const tsConnector = new TSConnector(config.tsConnector);
export const tsReceptionConnector = new TSReceptionConnector(config.tsReceptionConnector);
export const moderatorConnector = new ModeratorConnector(config.moderatorConnector);
export const scannerConnector = new ScannerConnector(config.scannerConnector);
export const baggageConnector = new BaggageConnector(config.baggageConnector);
export const baggageStateConnector = new BaggageStateConnector(config.baggageStateConnector);
export const complaintConnector = new ComplaintConnector(config.complaintConnector);

export default {
  authConnector,
  tsTypesConnector,
  tsConnector,
  tsReceptionConnector,
  moderatorConnector,
  scannerConnector,
  baggageConnector,
  baggageStateConnector,
  complaintConnector
};