const express = require("express");
const {
  UploadAttachments,
  CheckCaseStatus,
  Attachments,
} = require("../../Controller/CaseStatus");

const router = express.Router();

router.post("/casestatus/uploads", UploadAttachments);

router.get("/casestatus", CheckCaseStatus);
router.get("/casestatus/attachments", Attachments);

module.exports = { router };
