import { Schema, model } from "mongoose";

const schema = new Schema({
    email: {
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
    },
}, { timestamps: true });


const userModel = model('User', schema)

export default userModel;

