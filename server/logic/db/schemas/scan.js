let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  model: {
    type: String,
    required: true
  },
  descriptionHesh: {
    type: [Schema.Types.ObjectId]
  },
  summary: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }, 
  managerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  time: {
    type: Number,
    default: Date.now
  }
}, { versionKey: false });