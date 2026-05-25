const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        caseId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        caseType: {
            type: String,
            enum: ["individual", "organisational"],
            required: true
        },
        text: {
            type: String,
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
        attachment: { type: mongoose.Schema.Types.ObjectId, ref: "complainMedia" },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
