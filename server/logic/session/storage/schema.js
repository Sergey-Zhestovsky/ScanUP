let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  _id: String,
  uid: {
    type: String,
    required: true,
    index: true
  },
  date: {
    type: Number,
    default: Date.now
  },
  data: {
    type: Object,
    default: {}
  }
}, { _id: false, versionKey: false, minimize: false });