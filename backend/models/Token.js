const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "admins" },
  },
  { timestamps: true },
);

const Token = mongoose.model("token", schema);

module.exports = Token;
