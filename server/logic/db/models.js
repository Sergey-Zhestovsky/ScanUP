let baggage = require("./schemas/baggage"),
  baggageComparison = require("./schemas/baggageComparison"),
  baggageTransportationState = require("./schemas/baggageTransportationState"),
  complaint = require("./schemas/complaint"),
  complaintReason = require("./schemas/complaintReason"),
  privilege = require("./schemas/privilege"),
  privilegeAction = require("./schemas/privilegeAction"),
  scan = require("./schemas/scan"),
  scanPlaceDescription = require("./schemas/scanPlaceDescription"),
  scanTypeDescription = require("./schemas/scanTypeDescription"),
  scanner = require("./schemas/scanner"),
  transportSystem = require("./schemas/transportSystem"),
  transportSystemNamingStandard = require("./schemas/transportSystemNamingStandard"),
  transportSystemReception = require("./schemas/transportSystemReception"),
  transportSystemType = require("./schemas/transportSystemType"),
  user = require("./schemas/user");

function createModels(mongoose) {
  return {
    Baggage: mongoose.model('Baggage', baggage),
    BaggageComparison: mongoose.model('BaggageComparison', baggageComparison),
    BaggageTransportationState: mongoose.model('BaggageTransportationState', baggageTransportationState),
    Complaint: mongoose.model('Complaint', complaint),
    ComplaintReason: mongoose.model('ComplaintReason', complaintReason),
    Privilege: mongoose.model('Privilege', privilege),
    PrivilegeAction: mongoose.model('PrivilegeAction', privilegeAction),
    Scan: mongoose.model('Scan', scan),
    ScanPlaceDescription: mongoose.model('ScanPlaceDescription', scanPlaceDescription),
    ScanTypeDescription: mongoose.model('ScanTypeDescription', scanTypeDescription),
    Scanner: mongoose.model('Scanner', scanner),
    TransportSystem: mongoose.model('TransportSystem', transportSystem),
    TransportSystemNamingStandard: mongoose.model('TransportSystemNamingStandard', transportSystemNamingStandard),
    TransportSystemReception: mongoose.model('TransportSystemReception', transportSystemReception),
    TransportSystemType: mongoose.model('TransportSystemType', transportSystemType),
    User: mongoose.model('User', user)
  };
}

module.exports = createModels;