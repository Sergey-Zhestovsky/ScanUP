let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String,
    required: true
  },
  transportSystemId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  scannerId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { versionKey: false });