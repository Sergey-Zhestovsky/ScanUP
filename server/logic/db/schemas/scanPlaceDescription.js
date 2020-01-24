let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String,
    required: true
  },
  index: {
    type: String,
    unique: true,
    required: true
  }
}, { versionKey: false });