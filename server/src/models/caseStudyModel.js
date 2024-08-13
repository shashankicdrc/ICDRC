import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        description: {
            type: String,
            required: [true, 'descriptioon is required'],
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
    },
    { timestamps: true },
);

const caseStudyModel = model('case_Study', schema);

export default caseStudyModel;
