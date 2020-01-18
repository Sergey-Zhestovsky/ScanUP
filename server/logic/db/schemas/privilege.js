let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  index: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  actions: {
    type: [Schema.Types.ObjectId],
    required: true
  }
}, { versionKey: false });