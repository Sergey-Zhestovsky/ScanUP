let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  uId: {
    type: String,
    unique: true,
    required: true
  },
  transportationStateId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  formerScan: {
    type: Schema.Types.ObjectId,
    required: true
  },
  latterScan: {
    type: Schema.Types.ObjectId,
    default: null
  },
  comparisonId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  summary: {
    type: Number,
    default: null
  },
  passportId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  time: {
    type: Number,
    default: Date.now
  }
}, { versionKey: false });