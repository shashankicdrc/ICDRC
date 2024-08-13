import { Schema, model } from "mongoose";

const schema = new Schema({
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
        required: [true, "Mobile number is required"],
    },
    issue: {
        type: String,
        required: [true, "Issue is required."],
    },
}, { timestamps: true })

const chatBotModel = model('chatBot', schema)

export default chatBotModel;
