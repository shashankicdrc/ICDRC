const express = require("express");
const {
  UploadAttachments,
  CheckCaseStatus,
  Attachments,
  updateStatus,
  deleteCase,
} = require("../../Controller/CaseStatus");
const adminValidation = require("../../middlewares/adminValidation");

const router = express.Router();

router.post("/casestatus/uploads", UploadAttachments);
router.put("/casestatus", adminValidation, updateStatus);
router.delete("/casestatus", adminValidation, deleteCase);
router.get("/casestatus", CheckCaseStatus);
router.get("/casestatus/attachments", Attachments);

module.exports = { router };
