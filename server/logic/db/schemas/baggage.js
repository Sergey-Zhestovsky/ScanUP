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
  formerScanId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  latterScanId: {
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
  passport: {
    type: String,
    required: true
  }
}, { versionKey: false });