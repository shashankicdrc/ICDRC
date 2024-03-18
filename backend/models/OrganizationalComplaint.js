const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    organization_name: {
        type: String,
        required: [true, " organization_name is required"],
    },
    mobile: {
        type: String,
        required: [true, "mobile is required"],
        unique: [true, "Phone number already exists"]
       
    },
    email: {
        type: String,
        required: [true, "email  is required"],
        unique: [true, "Email Id already exists"]
    },
    country: {
        type: String,
        required: [true, "country is required"],
    },
    state: {
        type: String,
        required: [true, "state is required"],
    },
    city: {
        type: String,
        required: [true, "city is required"],
    },
    address: {
        type: String,
        required: [true, "address is required"],
    },
    language: {
        type: String,
        required: [true, "language is required"],
    },
    policyCompany: {
        type: String,
        required: [true, "policy_company is required"],
    },
    policyType: {
        type: String,
        required: [true, "policyType is required"],
    },
    problem: {
        type: String,
        required: [true, "problem is required"],
    },
    problemDetails: {
        type: String,
        required: [true, "problemDetails is required"],
    },
    transactionId: {
        type: String,
    }
    
}, { timestamps: true });
mongoose.models = {};

const OrganizationalComplaint = mongoose.model('OrganizationComplaints', schema)

module.exports = {OrganizationalComplaint};