import { Schema, model } from 'mongoose';

const planSchema = new Schema({
    name: {
        type: String,
        enum: ['Basic', 'Premium', 'Enterprise'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: function () {
            switch (this.name) {
                case 'Basic':
                    return 1;
                case 'Premium':
                    return 2;
                case 'Enterprise':
                    return 3;
                default:
                    return 0;
            }
        },
    },
    durationInDays: {
        type: Number,
        required: true,
        default: function () {
            switch (this.name) {
                case 'Basic':
                    return 1;
                case 'Premium':
                    return 1;
                case 'Enterprise':
                    return 1;
                default:
                    return 0;
            }
        },
    },
    complaintLimit: {
        type: Number,
        required: true,
        default: function () {
            switch (this.name) {
                case 'Basic':
                    return 2;
                case 'Premium':
                    return 3;
                case 'Enterprise':
                    return 4;
                default:
                    return 0;
            }
        },
    },
});

const planModel = model('plan', planSchema);

export default planModel;
