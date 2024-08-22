import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email Id is required'],
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        mobile: {
            type: String,
            required: [true, 'Mobile number is required'],
        },
        company: {
            type: String,
            required: [true, 'Company name is required'],
        },
        isDeleted: {
            type: Boolean,
            required: [true, 'isDeleted is required'],
            default: false,
        },
    },
    { timestamps: true },
);

const partnerModel = model('partner', schema);

export default partnerModel;
