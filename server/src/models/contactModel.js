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
        whatsapp: {
            type: String,
            required: [true, 'Whatsapp is required'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
        },
    },
    { timestamps: true },
);

const contactModel = model('contacts', schema);

export default contactModel;
