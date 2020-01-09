let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  name: {
    type: String,
    required: true
  },
  actions: {
    type: [Schema.Types.ObjectId],
    required: true
  }
}, { versionKey: false });