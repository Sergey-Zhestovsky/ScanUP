let mongoose = require("../connect"),
  schemas = require("../models"),
  { ServerError, serverErrors } = require("../../classes/ServerError");

async function addByScanId({ title, message, scanId }) {
  let baggageWithFormerScan, baggageWithLatterScan, reasonIndex = 1;

  try {
    baggageWithFormerScan = await schemas.Baggage.findOne({ formerScanId: scanId });

    if (!baggageWithFormerScan) {
      baggageWithLatterScan = await schemas.Baggage.findOne({ latterScanId: scanId });
      reasonIndex = 2;
    }

    if (!baggageWithFormerScan && !baggageWithLatterScan)
      throw new ServerError(serverErrors.COMPLAINT__SCAN_NOT_FOUND);

    let baggage = baggageWithLatterScan || baggageWithFormerScan;
    let complaintReasonId = await schemas.ComplaintReason.findOne({ index: reasonIndex });

    let complaint = new schemas.Complaint({
      baggageId: baggage._id,
      reasonId: complaintReasonId._id,
      title,
      message,
    });

    return await complaint.save();
  } catch (error) {
    throw ServerError.customError("addByScanId_complaint", error);
  }
}

async function getPublic() {
  try {
    return await schemas.Complaint.aggregate([{
      $lookup: {
        from: "baggages",
        localField: "baggageId",
        foreignField: "_id",
        as: "baggage"
      }
    }, {
      $unwind: {
        path: "$baggage",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $lookup: {
        from: "complaintreasons",
        localField: "reasonId",
        foreignField: "_id",
        as: "reason"
      }
    }, {
      $unwind: {
        path: "$reason",
        preserveNullAndEmptyArrays: true
      }
    }]);
  } catch (error) {
    throw ServerError.customError("getPublic_complaint", error);
  }
}

module.exports = {
  addByScanId,
  getPublic
};