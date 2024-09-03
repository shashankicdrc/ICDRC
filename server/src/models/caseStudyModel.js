import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        description: {
            type: String,
            required: [true, 'descriptioon is required'],
        },
        slug: {
            type: String,
            required: [true, 'Slug is required.'],
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
        isDeleted: {
            type: Boolean,
            requried: [true, 'isDeleted is required'],
            default: false,
        },
    },
    { timestamps: true },
);

schema.index({ slug: 1 });

const caseStudyModel = model('case_Study', schema);

export default caseStudyModel;
