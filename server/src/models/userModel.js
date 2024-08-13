import { Schema, model } from "mongoose";

const schema = new Schema({
    email: {
        type: String,
        required: [true, "email id is required"],
        unique: [true, "email id already exists"]
    },
    name: {
        type: String,
        required: [true, "name is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
}, { timestamps: true });


const usermodel = model('user', schema)

export default usermodel;

