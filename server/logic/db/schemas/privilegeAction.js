let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  token: {
    type: Number,
    unique: true,
    required: true
  },
  action: {
    type: String,
    required: true
  }
}, { versionKey: false });