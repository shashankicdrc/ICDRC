import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required.'],
        },
        image: {
            type: String,
            required: [true, 'image is required.'],
        },
        isDeleted: {
            type: Boolean,
            required: [true, 'isDeleted is required.'],
            default: false,
        },
    },
    { timestamps: true },
);

const teamModel = model('Team', schema);

export default teamModel;
