module.exports = [{
  $lookup: {
    from: "transportsystemreceptions",
    localField: "transportSystemReceptionId",
    foreignField: "_id",
    as: "transportSystemReception"
  }
}, {
  $unwind: {
    path: "$transportSystemReception",
    preserveNullAndEmptyArrays: true
  }
}, {
  $project: { "transportSystemReceptionId": 0 }
}, {
  $lookup: {
    from: "scanners",
    localField: "transportSystemReception.scannerId",
    foreignField: "_id",
    as: "transportSystemReception.scanner"
  }
}, {
  $unwind: {
    path: "$transportSystemReception.scanner",
    preserveNullAndEmptyArrays: true
  }
}, {
  $project: { "transportSystemReception.scannerId": 0 }
}, {
  $lookup: {
    from: "transportsystems",
    localField: "transportSystemReception.transportSystemId",
    foreignField: "_id",
    as: "transportSystem"
  }
}, {
  $unwind: {
    path: "$transportSystem",
    preserveNullAndEmptyArrays: true
  }
}];