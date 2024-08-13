
import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        plan: {
            type: String,
            enum: ["Basic", "Premium", "Enterprise"],
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
            default: function() {
                switch (this.plan) {
                    case 'Basic':
                        return 5;
                    case 'Premium':
                        return 10;
                    case 'Enterprise':
                        return 15
                    default:
                        return 5;
                }
            }
        },
        usedComplaints: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

subscriptionSchema.methods.cancel = function() {
    this.isActive = false;
    this.endDate = Date.now();
    return this.save();
};

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;
