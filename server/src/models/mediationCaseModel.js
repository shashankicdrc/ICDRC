import { Schema, model } from 'mongoose';

const evidenceSchema = new Schema(
    {
        name: String,      // e.g. "Contract.pdf"
        url: String,       // storage URL (Cloudinary, S3, etc.)
    },
    { _id: false },
);

const mediationCaseSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },

        // Frontend MediationForm.jsx fields
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },

        opponentName: {
            type: String,
            required: [true, 'Opposite party name is required'],
        },

        description: {
            type: String,
            required: [true, 'Description of dispute is required'],
        },
        category: {
            type: String,
            required: [true, 'Dispute category is required'],
        },
        amount: {
            type: Number,
        },

        timeline: {
            type: String,
        },
        jurisdiction: {
            type: String, // country / jurisdiction
            required: [true, 'Jurisdiction is required'],
        },
        language: {
            type: String,
        },
        resolution: {
            type: String, // e.g. refund / compensation / payment plan / replacement / other
        },
        files: [evidenceSchema], // list of uploaded documents (URLs)

        // Frontend subscription gating fields
        isSubscribed: {
            type: Boolean,
            default: false,
        },
        subscriptionId: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
        },

        // Lifecycle
        status: {
            type: String,
            enum: [
                'Draft',
                'Submitted',
                'Paid',
                'Under Review',
                'Mediator Assigned',
                'Respondent Invited',
                'Mode Selection Pending',
                'Session Scheduled',
                'In Mediation',
                'Settled',
                'Not Settled',
                'Closed',
            ],
            default: 'Draft',
        },
    },
    { timestamps: true },
);

const MediationCase = model('MediationCase', mediationCaseSchema);

export default MediationCase;