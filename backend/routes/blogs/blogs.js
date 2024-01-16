const express = require('express');
const { asyncError } = require('../../middlewares/error');
const Blog = require('../../models/Blog');
const verifyToken = require('../../utils/verifyToken');

const router = express.Router();


// create blog
router.post('/', asyncError(async (req, res) => {

    // Token Verification
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ success: false, message: "No token provided" });
    }
    let user = verifyToken(token);
    if (!user.success) {
        return res.status(400).json({ success: false, message: user.message });
    }

    let { name, desc, image, content } = req.body;
    if (!name || !image || !desc || !content) {
        return res.status(400).json({ success: false, message: "Please Enter all fields." })
    }

    // creating the project
    await Blog.create({ name, image, desc, content });

    res.status(201).json({
        success: true,
        message: "Blog Added",
    })

}))

// get all  blogs
router.get('/', asyncError(async (req, res) => {
    const blogs = await Blog.find({}).select('-content');
    blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.status(200).json({ success: true, data: blogs });
}))

// get single  blog
router.get('/:id', asyncError(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Invalid request." })
    }
    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(400).json({ success: false, message: "Invalid request, Blog not found." })
    }

    res.status(200).json({ success: true, data: blog });

}))

// delete blog
router.delete('/:id', asyncError(async (req, res) => {

    // Token Verification
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ success: false, message: "No token provided" });
    }
    let user = verifyToken(token);
    if (!user.success) {
        return res.status(400).json({ success: false, message: user.message });
    }

    const id = req.params.id;

    const data = await Blog.findById(id);
    if (!data) {
        return res.status(400).json({ success: false, message: "Data not found" })
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted Successfully." })
}))

module.exports = router;