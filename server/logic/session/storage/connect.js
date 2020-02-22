let mongoose = require("./mongoose"),
  config = require("../../../config").session.storage;

let connect = mongoose.connect(config.url, { ...config.options });

connect
  .then(({ connection, models }) => {
    connection.db.stats(async (err, stats) => {
      if (stats.collections !== 0) return;

      for (let model in models) {
        await models[model].createCollection();
      }
    });
  });

module.exports = connect;