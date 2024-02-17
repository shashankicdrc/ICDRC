const express = require('express');
const { asyncError } = require('../../middlewares/error');
const Newsletter = require('../../models/Newsletter');
const verifyToken = require('../../utils/verifyToken');

const router = express.Router();


// create partner
router.post('/', asyncError(async (req, res) => {

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Please Enter all fields." })
    }

    await Newsletter.create({ email });

    res.status(201).json({ success: true, message: "Subscribed!" })

}))

// get partner data
router.get('/', asyncError(async (req, res) => {

    // Token Verification
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ success: false, message: "No token provided" });
    }
    let user = verifyToken(token);
    if (!user.success) {
        return res.status(400).json({ success: false, message: user.message });
    }

    const data = await Newsletter.find();
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.status(200).json({ success: true, count: data.length, data });
}))

// delete partner data
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

    const data = await Newsletter.findById(id);
    if (!data) {
        return res.status(400).json({ success: false, message: "Data not found" })
    }

    await Newsletter.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted Successfully." })
}))

module.exports = router;