import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        plan: {
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
            default: function () {
                return new Date(
                    Date.now() + this.plan.durationInDays * 24 * 60 * 60 * 1000,
                );
            },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        complaintLimit: {
            type: Number,
            default: function () {
                return this.plan.complaintLimit;
            },
        },
        usedComplaints: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

subscriptionSchema.methods.cancel = function () {
    this.isActive = false;
    this.endDate = Date.now();
    return this.save();
};

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;
