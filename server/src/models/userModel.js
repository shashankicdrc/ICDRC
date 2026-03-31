import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'email id is required'],
            unique: [true, 'email id already exists'],
        },
        name: {
            type: String,
            required: [true, 'name is required'],
        },
        provider: {
            type: String,
            enum: ['credential', 'google', 'facebook'],
            default: 'credential',
        },
        providerId: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    { timestamps: true },
);

const usermodel = model('user', schema);

export default usermodel;
