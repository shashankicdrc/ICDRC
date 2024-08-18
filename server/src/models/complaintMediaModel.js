import { Schema, model } from 'mongoose';

const MediaSchema = new Schema({
    url: String,
    public_id: String,
});

const complaintMediaSchema = new Schema({
    attachment_name: {
        type: String,
        required: [true, 'attachment_name is required.'],
    },
    media: [MediaSchema],
});

const complaintMedia = model('complaintMedia', complaintMediaSchema);

export default complaintMedia;
