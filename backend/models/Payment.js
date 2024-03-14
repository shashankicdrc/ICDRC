const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
  name: {
      type: String,
      required: true,
    },
  email: {
      type: String,
      required: true,
    },
  mobile: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 1,
      required: true,
    },
  transactionid: {
      type: String,
      required: true,
    },
    merchantUserId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["successful","failed","pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const model = mongoose.model("payments", Schema);
module.exports = model;