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
    },
    role: {
        type: String,
        required: [true, 'Role is required.']
    }
}, { timestamps: true });

mongoose.models = {};

const Admin = mongoose.model('admins', schema)

module.exports = Admin;