const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    isPay: {
      type: Boolean,
      default: false,
    },

    organization_name: {
      type: String,
      required: [true, " organization_name is required"],
    },
    mobile: {
      type: String,
      required: [true, "mobile is required"],
    },
    email: {
      type: String,
      required: [true, "email  is required"],
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
      default: "pending",
      enum: ["pending", "processing", "completed"],
    },
    attachments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "complainMedia" },
    ],
    caseId: {
      type: String,
      unique: true,
    },
  },

  { timestamps: true },
);

const generateCaseId = async function () {
  const latestDoc = await OrganizationalComplaint.findOne()
    .sort("-caseId")
    .exec();
  let currentId = 1000;

  if (latestDoc) {
    const lastId = parseInt(latestDoc.caseId.split("-")[2]);
    currentId = lastId + 1;
  }

  const newId = `ICDRC-ORG-${currentId}`;
  return newId;
};

schema.pre("save", async function (next) {
  try {
    if (!this.caseId) {
      this.caseId = await generateCaseId();
    }
    next();
  } catch (error) {
    console.error("Error in pre-save middleware:", error);
    next(error); // Pass the error to the next middleware or function in the chain
  }
});

const OrganizationalComplaint = mongoose.model(
  "OrganizationComplaints",
  schema,
);

module.exports = { OrganizationalComplaint };
