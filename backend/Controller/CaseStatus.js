const cloudinary = require("cloudinary");
const busboy = require("busboy");
const { EventEmitter } = require("node:events");
const { isValidObjectId } = require("mongoose");
const ComplainMedia = require("../models/ComplainMedia");
const {
  OrganizationalComplaint,
} = require("../models/OrganizationalComplaint");
const { IndividualComplaint } = require("../models/IndividualComplaint");
const { asyncError } = require("../middlewares/error");

const CheckCaseStatus = asyncError(async (req, res) => {
  const { email, id, type } = req.query;
  switch (type) {
    case "individual":
      const individualComplaints = await IndividualComplaint.findOne({
        email,
        _id: id,
      });
      if (!individualComplaints) {
        return res.status(400).json({ error: "Case does not exist." });
      }
      return res.status(200).json({ data: individualComplaints });
    case "organisation":
      const organisationalComplaints = await OrganizationalComplaint.findOne({
        email,
        _id: id,
      });
      if (!organisationalComplaints) {
        return res.status(400).json({ error: "Case does not exist." });
      }
      return res.status(200).json({ data: organisationalComplaints });

    default:
      return res
        .status(400)
        .json({ error: `Invalid ${type} has been provided` });
  }
});

const UploadAttachments = asyncError(async (req, res) => {
  const validFields = ["attachment_name", "type", "id"];
  const receivedFields = [];
  const fieldData = new Map();
  const emitter = new EventEmitter();
  const bb = busboy({ headers: req.headers });
  const typeField = ["individual", "organisational"];

  const checkMissingFields = () => {
    const missingFields = validFields.filter(
      (field) => !receivedFields.includes(field),
    );
    if (missingFields.length > 0) {
      const fields = missingFields.join(",");
      return { missing: true, message: `Missing fields: ${fields}` };
    } else {
      return { missing: false, message: "Fullfilled" };
    }
  };

  async function handleError(fn) {
    try {
      await fn();
    } catch (e) {
      req.unpipe(bb);
    }
  }
  let filesCount = 0;
  const uploadedData = [];

  const uploader = () => {
    return cloudinary.v2.uploader.upload_stream(
      { use_filename: true },
      (error, data) => {
        if (error) {
          return res.status(error.http_code).json({ error: error.message });
        } else if (data) {
          uploadedData.push({
            url: data.secure_url,
            public_id: data.public_id,
          });
          if (filesCount === uploadedData.length)
            emitter.emit("updateDatabase");
        }
      },
    );
  };

  bb.on("error", (error) => {
    return res.status(500).json({ error: error });
  });

  bb.on("field", (fieldname, value) => {
    receivedFields.push(fieldname);
    handleError(async () => {
      switch (fieldname) {
        case "attachment_name":
          if (value.length < 4) {
            return res.status(400).json({
              error: "Attachment name should be at least 4 character.",
            });
          }

          fieldData.set(fieldname, value);
          break;
        case "id":
          if (!isValidObjectId(value)) {
            return res
              .status(400)
              .json({ error: "Invalid id has been provided" });
          }
          fieldData.set(fieldname, value);
          break;
        case "type":
          if (!typeField.includes(value)) {
            return res
              .status(400)
              .json({ error: "Invalid type has been provided" });
          }
          fieldData.set(fieldname, value);
          break;
      }
    });
  });

  bb.on("file", (filename, file, info) => {
    handleError(async () => {
      const checkField = checkMissingFields();
      if (checkField.missing) {
        return res.status(400).json({ error: checkField.message });
      }
      if (!checkField.missing) {
        file.pipe(uploader());
      } else {
        file.resume();
      }
    });
    file.on("end", () => (filesCount = filesCount + 1));
  });

  emitter.on("updateDatabase", async () => {
    const attachment_name = fieldData.get("attachment_name");
    const type = fieldData.get("type");
    const id = fieldData.get("id");

    const newMedia = await ComplainMedia.create({
      type,
      attachment_name,
      media: uploadedData,
    });

    if (type === "individual") {
      const indUpdatedData = await IndividualComplaint.findByIdAndUpdate(
        id,
        { $push: { attachments: newMedia._id } },
        { new: true },
      );
      return res.status(200).json({ data: indUpdatedData });
    }

    const orgUpdatedData = await OrganizationalComplaint.findByIdAndUpdate(
      id,
      { $push: { attachments: newMedia._id } },
      { new: true },
    );
    return res.status(200).json({ data: orgUpdatedData });
  });

  req.pipe(bb);
});

module.exports = { UploadAttachments, CheckCaseStatus };
