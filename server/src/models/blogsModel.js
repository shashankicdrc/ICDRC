import createSlug from '#utils/generateSlug';
import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        description: {
            type: String,
            required: [true, 'desc is required'],
        },
        slug: {
            type: String,
            required: [true, 'Slug is required'],
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
        isDeleted: {
            type: Boolean,
            required: [true, 'isDeleted is required.'],
            default: false,
        },
    },
    { timestamps: true },
);

schema.index({ slug: 1 });

const blogModel = model('blogs', schema);

export default blogModel;
