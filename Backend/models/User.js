const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    emailId: {
        type: String,
        required: [true, "Email Id is required"],
        unique: [true, "Email Id already exists"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    }
}, { timestamps: true });

mongoose.models = {};

const User = mongoose.model('user', schema)

module.exports = User;