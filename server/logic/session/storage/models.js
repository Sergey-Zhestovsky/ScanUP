let session = require("./schema");

function createModels(mongoose) {
  return {
    Session: mongoose.model('Session', session)
  };
}

module.exports = createModels;