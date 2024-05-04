const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});

const ComplainMediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["individual", "organisational"],
    default: "individual",
  },
  attachment_name: {
    type: String,
    required: [true, "attachment_name is required."],
  },
  media: [MediaSchema],
});

const ComplainMedia = mongoose.model("complainMedia", ComplainMediaSchema);

module.exports = ComplainMedia;
