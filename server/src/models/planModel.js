import { Schema, model } from 'mongoose';

const planSchema = new Schema({
    name: {
        type: String,
        enum: ['Individual', 'Organisational'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: function () {
            switch (this.name) {
                case 'Individual':
                    return 199;
                case 'Organisational':
                    return 1999;
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
                case 'Individual':
                    return 30 * 6;
                case 'Organisational':
                    return 30 * 6;
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
                case 'Individual':
                    return 5;
                case 'Organisational':
                    return 5;
                default:
                    return 0;
            }
        },
    },
});

const planModel = model('plan', planSchema);

export default planModel;
