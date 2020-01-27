let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  index: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, { versionKey: false });