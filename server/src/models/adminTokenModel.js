import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        adminId: {
            type: Schema.Types.ObjectId,
            required: [true, 'adminId is required'],
            ref: 'admins',
        },
        code: {
            type: String,
            required: [true, 'Code must be 6 characters long.'],
            minlength: 6,
            maxlength: 6,
        },
        expireTime: {
            type: Date,
            required: [true, 'Expire time is required.'],
        },
    },
    { timestamps: true },
);

const adminTokenModel = model('admin_token_model', schema);

export default adminTokenModel;
