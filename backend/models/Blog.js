const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    desc: {
        type: String,
        required: [true, "desc is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    image: {
        type: String,
        required: [true, "image is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },

}, { timestamps: true });

mongoose.models = {};

const Blog = mongoose.model('blogs', schema)

module.exports = Blog;