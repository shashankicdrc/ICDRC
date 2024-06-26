const { asyncError } = require("../middlewares/error");
const {
    OrganizationalComplaint,
} = require("../models/OrganizationalComplaint");
const { IndividualComplaint } = require("../models/IndividualComplaint");
const Comment = require("../models/Comment");

const getComment = asyncError(async (req, res) => {
    const { caseId, caseType } = req.query;
    const comments = await Comment.find({ caseId, caseType });
    return res.status(200).json({ data: comments });
})

const addComment = asyncError(async (req, res) => {
    const { caseId, caseType, text, authorType, authorName } = req.body;
    console.log(req.body)
    if (!caseId || !text || !caseType || !authorType || !authorName) {
        return res.status(400).json({ error: "Invalid request." });
    }

    const commentData = {
        caseId,
        caseType,
        text,
        authorType,
        authorName
    }

    switch (caseType) {
        case "individual":
            const isCaseExist = await IndividualComplaint.findById(caseId)
            if (!isCaseExist) return res.status(400).json({ error: "Case does not exist." })
            const addComment = await Comment.create(commentData)
            return res.status(200).json({ data: addComment })
        case "organisational":
            const isExist = await OrganizationalComplaint.findById(caseId)
            if (!isExist) return res.status(400).json({ error: "Case does not exist." })
            const comment = await Comment.create(commentData)
            return res.status(200).json({ data: comment })
        default:
            return res.status(400).json({ error: "Invalid case type provided." });
    }

})

module.exports = { getComment, addComment }


