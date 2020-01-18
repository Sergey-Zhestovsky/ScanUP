module.exports = [{
  $lookup: {
    from: "users",
    localField: "adminId",
    foreignField: "_id",
    as: "admin"
  }
}, {
  $unwind: {
    path: "$admin",
    preserveNullAndEmptyArrays: true
  }
}, {
  $project: { "adminId": 0, "admin.salt": 0, "admin.userPassword": 0 }
}, {
  $lookup: {
    from: "transportsystemtypes",
    localField: "typeId",
    foreignField: "_id",
    as: "type"
  }
}, {
  $unwind: {
    path: "$type",
    preserveNullAndEmptyArrays: true
  }
}, {
  $lookup: {
    from: "transportsystemnamingstandards",
    localField: "type.namingStandardId",
    foreignField: "_id",
    as: "type.namingStandard"
  }
}, {
  $unwind: {
    path: "$type.namingStandard",
    preserveNullAndEmptyArrays: true
  }
}, {
  $project: { "typeId": 0, "type.namingStandardId": 0 }
}, {
  $lookup: {
    from: "transportsystemreceptions",
    localField: "_id",
    foreignField: "transportSystemId",
    as: "receptions"
  }
}, {
  $addFields: {
    receptions: { $size: "$receptions" }
  }
}];