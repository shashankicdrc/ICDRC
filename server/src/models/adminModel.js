import { model } from 'mongoose';
import { Schema } from 'mongoose';

const schema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email Id is required'],
            unique: [true, 'Email Id already exists'],
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            default: 'subadmin',
            enum: ['admin', 'subadmin'],
        },
    },
    { timestamps: true },
);

const adminModel = model('admins', schema);

export default adminModel;
