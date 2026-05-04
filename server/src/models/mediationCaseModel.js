import { Schema, model } from 'mongoose';

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
        contactNumber: {
            type: String,
            required: [true, 'Contact number is required'],
        },

        opponentName: {
            type: String,
            required: [true, 'Opposite party name is required'],
        },
        opponentEmail: {
            type: String,
            required: [true, 'Opposite party email is required'],
        },
        opponentContact: {
            type: String,
            required: [true, 'Opposite party contact number is required'],
        },

        description: {
            type: String,
            required: [true, 'Description of dispute is required'],
        },
        amount: {
            type: Number,
            required: [true, 'Amount involved in dispute is required'],
        },

        termsAccepted: {
            type: Boolean,
            required: [true, 'Acceptance of terms and conditions is required'],
        },

        // new for google meet
        sessionMode: {
            type: String,
            enum: ['Online', 'Offline'],
        },
        sessionDate: {
            type: String, 
        },
        sessionStartTime: { // Naya: Start Time
            type: String, 
        },
        sessionEndTime: {   // Naya: End Time
            type: String, 
        },
        googleMeetLink: {
            type: String, 
            default: null,
        },

        // Lifecycle
        status: {
            type: String,
            enum: [
                'Draft',
                'Submitted',
                'Accepted',
                'Session Requested',
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
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid', 'Success', 'Failed'],
            default: 'Pending',
        },
        paymentTransactionId: {
            type: String,
        },
        paidAt: {
            type: Date,
        },
    },
    { timestamps: true },
);

const MediationCase = model('MediationCase', mediationCaseSchema);

export default MediationCase;