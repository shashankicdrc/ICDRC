import { Schema, model } from "mongoose";

const mediationPaymentHistorySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        mediationId: {
            type: Schema.Types.ObjectId,
            ref: 'mediation_case', // Aapke mediation model ka jo bhi exact naam ho
            required: true,
        },
        amount: {
            type: Number,
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
        paymentDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const MediationPaymentHistory = model('MediationPaymentHistory', mediationPaymentHistorySchema);

export default MediationPaymentHistory;