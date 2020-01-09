let mongoose = require("mongoose"),
  Schema = mongoose.Schema;

module.exports = new Schema({
  standard: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  isAlphabet: {
    type: Boolean,
    default: true
  },
  alphabet: {
    type: String,
    default: null
  },
  isNumber: {
    type: Boolean,
    default: true
  },
  isSymbol: {
    type: Boolean,
    default: false
  },
  symbol: {
    type: String,
    default: null
  }
}, { versionKey: false });

