const express = require("express");
const { getComment, addComment } = require("../../Controller/Comments");

const commnetRouter = express.Router();

commnetRouter.get('/comments', getComment)
commnetRouter.post('/comments', addComment)

module.exports = { commnetRouter }
