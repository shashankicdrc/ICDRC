const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    mobile: {
      type: String,
      required: [true, "mobile is required"],
    },
    email: {
      type: String,
      required: [true, "Email Id is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    state: {
      type: String,
      required: [true, "state is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    language: {
      type: String,
      required: [true, "state is required"],
    },
    policyCompany: {
      type: String,
      required: [true, "policy_company is required"],
    },
    policyType: {
      type: String,
      required: [true, "policyType is required"],
    },
    problem: {
      type: String,
      required: [true, "problem is required"],
    },
    problemDetails: {
      type: String,
      required: [true, "problemDetails is required"],
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      default: "prending",
      enum: ["pending", "processing", "completed"],
    },
    attachements: [
      { type: mongoose.Schema.Types.ObjectId, ref: "complainMedia" },
    ],
  },
  { timestamps: true },
);
mongoose.models = {};

const IndividualComplaint = mongoose.model("IndividualComplaints", schema);

module.exports = { IndividualComplaint };
