import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        complaintId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'complaintType',
        },
        complaintType: {
            type: String,
            enum: ['IndividualComplaint', 'OrganizationComplaint'],
            required: true,
        },
        authorId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'authorType',
        },
        authorType: {
            type: String,
            enum: ['admins', 'user'],
            required: true,
        },
        text: {
            type: String,
        },
        attachment: {
            type: Schema.Types.ObjectId,
            ref: 'complaintMedia',
        },
    },
    { timestamps: true },
);

const chatModel = model('chat', schema);

export default chatModel;
