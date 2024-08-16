import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        planId: {
            type: Schema.Types.ObjectId,
            ref: 'plan',
            required: true,
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        complaintLimit: {
            type: Number,
            required: true,
        },
        usedComplaints: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

const subscriptionModel = model('Subscription', schema);

export default subscriptionModel;
