const express = require("express");
const {
  UploadAttachments,
  CheckCaseStatus,
  Attachments,
  updateStatus,
  deleteCase,
  updatePayment,
} = require("../../Controller/CaseStatus");
const adminValidation = require("../../middlewares/adminValidation");

const router = express.Router();

router.post("/casestatus/uploads", UploadAttachments);
router.put("/casestatus", adminValidation, updateStatus);
router.put("/casestatus/payment", updatePayment);
router.delete("/casestatus", adminValidation, deleteCase);
router.get("/casestatus", CheckCaseStatus);
router.get("/casestatus/attachments", Attachments);

module.exports = { router };
