import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            unique: true,
        },
        plans: [
            {
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
                complaintLimit: {
                    type: Number,
                    required: true,
                },
                usedComplaints: {
                    type: Number,
                    default: 0,
                },
                isDeleted: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
    { timestamps: true },
);

const subscriptionModel = model('Subscription', schema);

export default subscriptionModel;
