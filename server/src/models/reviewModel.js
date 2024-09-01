import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        stars: {
            type: Number,
            max: 5,
            min: 1,
        },
        isDeleted: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const textTestimonialModel = model('textTestimonial', schema);

export default textTestimonialModel;
