let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  baggageId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  reasonId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    maxlength: 50
  },
  message: {
    type: String,
    maxlength: 300,
    required: true
  }
}, { versionKey: false });