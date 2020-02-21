let Mongoose = require("mongoose").Mongoose,
  modelsCreator = require("./models"),
  config = require("../../config").mongoDB_connect,
  controller = require("./controls");

let mongoose = new Mongoose(),
  connect = mongoose.connect(config.url, { ...config.options });

connect.then(({ connection, models }) => {
  modelsCreator(connection);
  connection.db.stats(async (err, stats) => {
    if (stats.collections !== 0) return;

    await controller.setCollections(models);
  });
});

connect.catch(error => {
  console.error(error);
});



module.exports = mongoose;