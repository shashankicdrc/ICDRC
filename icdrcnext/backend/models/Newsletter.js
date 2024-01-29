const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email Id is required"],
    }

}, { timestamps: true });

mongoose.models = {};

const Newsletter = mongoose.model('newsletters', schema)

module.exports = Newsletter;