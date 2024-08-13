
import { Schema, model } from "mongoose";

const paymentHistorySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentFor: {
            type: String,
            enum: ["Subscription", "Case Registration"],
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Success", "Failed"],
            default: "Pending",
        },
        complaintType: {
            type: String,
            enum: ["IndividualComplaint", "OrganizationComplaint"],
            required: function() { return this.paymentFor === "Case Registration"; },
        },
        complaintId: {
            type: Schema.Types.ObjectId,
            required: function() { return this.paymentFor === "Case Registration"; },
            refPath: 'complaintType',
        },
        individualId: {
            type: Schema.Types.ObjectId,
            ref: 'individual_complaint',
            required: function() { return this.caseType === "IndividualComplaint"; },
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: 'organization_complaint',
            required: function() { return this.caseType === "OrganizationComplaint"; },
        },
        subscriptionId: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
            required: function() { return this.paymentFor === "Subscription"; },
        },
        paymentDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const PaymentHistory = model('PaymentHistory', paymentHistorySchema);

export default PaymentHistory;
