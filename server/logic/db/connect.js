let mongoose = require("mongoose"),
  models = require("./models"),
  config = require("../../config"),
  controller = require("./controls");

let connect = mongoose.connect(config.mongoDB_connect.url, {
  ...config.mongoDB_connect.options
});

connect.then(({ connection, models }) => {
  connection.db.stats(async (err, stats) => {
    if (stats.collections !== 0)
      return;

    await controller.setCollections(models);
  });
});

connect.catch(error => {
  console.error(error);
});



module.exports = mongoose;