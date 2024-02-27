const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        unique: [true, "Phone number already exists"]
       
    },
    emailId: {
        type: String,
        required: [true, "Email Id is required"],
        unique: [true, "Email Id already exists"]
    },
    state: {
        type: String,
        required: [true, "state is required"],
    },
    address: {
        type: String,
        required: [true, "address is required"],
    },
    policy_company: {
        type: String,
        required: [true, "policy_company is required"],
    },
    policy_type: {
        type: String,
        required: [true, "policy_type is required"],
    },
    problem: {
        type: String,
        required: [true, "problem is required"],
    },
    problem_detail: {
        type: String,
        required: [true, "problem_detail is required"],
    }
    
    
}, { timestamps: true });
mongoose.models = {};

const model = mongoose.model('users', schema)

module.exports = model;