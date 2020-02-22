let mongoose = require("./mongoose"),
  models = require("./models")(mongoose),
  connect = require("./connect"),
  actions = require("./actions");

module.exports = connect.then(() => actions);