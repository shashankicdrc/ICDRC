const express = require('express');
const { asyncError } = require('../../middlewares/error');
const CaseStudy = require('../../models/CaseStudy');
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
    await CaseStudy.create({ name, image, desc, content });

    res.status(201).json({
        success: true,
        message: "Case Study Added",
    })

}))

// get all  blogs
router.get('/', asyncError(async (req, res) => {
    const blogs = await CaseStudy.find({}).select('-content');
    blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.status(200).json({ success: true, data: blogs });
}))

// get single  blog
router.get('/:id', asyncError(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Invalid request." })
    }
    const blog = await CaseStudy.findById(id);
    if (!blog) {
        return res.status(400).json({ success: false, message: "Invalid request, Case Study not found." })
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

    const data = await CaseStudy.findById(id);
    if (!data) {
        return res.status(400).json({ success: false, message: "Data not found" })
    }

    await CaseStudy.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted Successfully." })
}))

module.exports = router;