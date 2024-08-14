import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        description: {
            type: String,
            required: [true, 'desc is required'],
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        image: {
            type: String,
            required: [true, 'image is required'],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        keywords: [
            {
                type: String,
                required: [true, 'keywords is required.'],
            },
        ],
    },
    { timestamps: true },
);

const blogModel = model('blogs', schema);

export default blogModel;
