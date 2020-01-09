let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  typeId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  selfControl: {
    type: Boolean,
    default: true,
    required: true
  },
  adminId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  APIIntegrate: {
    type: Boolean,
    default: false
  },
  shortName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    maxlength: 100,
    required: true
  }
}, { versionKey: false });