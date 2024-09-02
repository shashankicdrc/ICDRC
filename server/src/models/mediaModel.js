import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        video: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true },
);

const mediaModel = model('media', schema);

export default mediaModel;
