import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        name: {
            type: String,
        },
        image: {
            type: String,
        },
        video: {
            type: String,
        },
    },
    { timestamps: true },
);

const mediaModel = model('media', schema);

export default mediaModel;
