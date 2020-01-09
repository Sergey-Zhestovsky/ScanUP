let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  uId: {
    type: String,
    unique: true,
    required: true
  }
}, { versionKey: false });