const express = require('express');
const { asyncError } = require('../../middlewares/error');
const Contact = require('../../models/Contact');
const verifyToken = require('../../utils/verifyToken');

const router = express.Router();


// create contact
router.post('/', asyncError(async (req, res) => {

    const { name, email, mobile, whatsapp, message } = req.body;
    if (!name || !email || !mobile || !whatsapp || !message) {
        return res.status(400).json({ success: false, message: "Please Enter all fields." })
    }

    await Contact.create({ name, email, mobile, whatsapp, message });

    res.status(201).json({ success: true, message: "Message sent" })

}))

// get chat bot data
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

    const data = await Contact.find();
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.status(200).json({ success: true, count: data.length, data });
}))

// delete chat bot data
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

    const data = await Contact.findById(id);
    if (!data) {
        return res.status(400).json({ success: false, message: "Data not found" })
    }

    await Contact.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted Successfully." })
}))

module.exports = router;