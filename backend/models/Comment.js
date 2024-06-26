const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        caseId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        caseType: {
            type: String,
            enum: ["individual", "organisational"],
            required: true
        },
        text: {
            type: String,
            required: true
        },
        authorType: {
            type: String,
            enum: ["icdrc", "user",],
            required: true
        },
        authorName: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
