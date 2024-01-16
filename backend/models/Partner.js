const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email Id is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"]
    },
    company: {
        type: String,
        required: [true, "Company name is required"]
    },

}, { timestamps: true });

mongoose.models = {};

const Partner = mongoose.model('partners', schema)

module.exports = Partner;