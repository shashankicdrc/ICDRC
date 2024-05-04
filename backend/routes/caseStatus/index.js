const express = require("express");
const {
  UploadAttachments,
  CheckCaseStatus,
} = require("../../Controller/CaseStatus");

const router = express.Router();

router.post("/casestatus/uploads", UploadAttachments);

router.get("/casestatus", CheckCaseStatus);

module.exports = { router };
