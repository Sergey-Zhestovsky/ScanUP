let mongoose = require("../connect"),
  schemas = require("../models"),
  keyGenerator = require("../../modules/keyGenerator"),
  { ServerError, serverErrors } = require("../../classes/ServerError");

async function add(data) {
  let reception, responce = {}, scanner, uKey;

  try {
    do {
      uKey = keyGenerator();
      scanner = await schemas.Scanner.findOne({ uId: uKey });
    } while (scanner)

    scanner = new schemas.Scanner({ uId: uKey });
    scanner = await scanner.save();
    reception = new schemas.TransportSystemReception({ ...data, scannerId: scanner._id });
    reception = await reception.save();
    responce = (await schemas.TransportSystemReception.aggregate([{
      $match: {
        transportSystemId: new mongoose.Types.ObjectId(reception.transportSystemId)
      }
    }, {
      $count: "receptions"
    }]))[0];
    responce = { ...responce, ...reception._doc };
  } catch (error) {
    throw ServerError.customError("add_tsReception", error);
  }

  return responce;
}

module.exports = {
  add
};