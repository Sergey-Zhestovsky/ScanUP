let mongoose = require("mongoose"),
  models = require("./models"),
  config = require("../../config");

mongoose.connect(config.mongoDB_connect.url, {
  ...config.mongoDB_connect.options
})
  .then(setCollections,
    error => {
      console.error(error);
    }
  );

async function setCollections() {
  try {
    for (let model in models) {
      await models[model].createCollection();
    }
  } catch (error) {
    return Promise.reject(error);
  }

  return;
}

module.exports = mongoose;