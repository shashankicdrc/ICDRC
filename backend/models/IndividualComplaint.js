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
        isPay: {
            type: Boolean,
            default: false,
        },
        caseId: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true },
);

const generateCaseId = async function() {
    const latestDoc = await IndividualComplaint.findOne().sort("-caseId").exec();
    let currentId = 1000;

    if (latestDoc) {
        const lastId = parseInt(latestDoc.caseId.split("-")[2]);
        currentId = lastId + 1;
    }

    const newId = `ICDRC-IND-${currentId}`;
    return newId;
};

schema.pre("save", async function(next) {
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

const IndividualComplaint = mongoose.model("IndividualComplaints", schema);

module.exports = { IndividualComplaint };
