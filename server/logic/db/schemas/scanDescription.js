let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String,
    required: true
  },
  heshSuffix: {
    type: String,
    required: true
  }
}, { versionKey: false });