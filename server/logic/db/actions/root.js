let user = require("./user"),
  transportSystem = require("./transportSystem"),
  tsType = require("./tsType"),
  privilege = require("./privilege"),
  tsReception = require("./tsReception"),
  baggage = require("./baggage"),
  baggageTransportationState = require("./baggageTransportationState"),
  complaint = require("./complaint"),
  scan = require("./scan");

module.exports = {
  user,
  tsType,
  transportSystem,
  tsReception,
  privilege,
  scan,
  baggage,
  baggageTransportationState,
  complaint
}