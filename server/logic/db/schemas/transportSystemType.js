let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String,
    required: true
  },
  ticketType: {
    type: String,
    required: true
  },
  namingStandardId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { versionKey: false });