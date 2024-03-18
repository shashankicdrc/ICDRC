// models/Document.js

const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
