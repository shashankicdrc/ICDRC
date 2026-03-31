
import { Schema, model } from "mongoose";

const userTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "userId is required"],
        ref: 'user'
    },
    type: {
        type: String,
        enum: ['password_reset', 'email_verification'],
        default: 'password_reset',
        required: [true, "Token type is required."],
    },
    code: {
        type: String,
        required: [true, "Code must be 6 characters long."],
        minlength: 6,
        maxlength: 6,
    },
    expireTime: {
        type: Date,
        required: [true, "Expire time is required."],
    },
}, { timestamps: true });

const userTokenModel = model('user_token_model', userTokenSchema);

export default userTokenModel;

