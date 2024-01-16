const express = require('express');
const { asyncError } = require('../../middlewares/error');
const Partner = require('../../models/Partner');
const verifyToken = require('../../utils/verifyToken');

const router = express.Router();


// create partner
router.post('/', asyncError(async (req, res) => {

    const { name, email, mobile, company, } = req.body;
    if (!name || !email || !mobile || !company) {
        return res.status(400).json({ success: false, message: "Please Enter all fields." })
    }

    await Partner.create({ name, email, mobile, company  });

    res.status(201).json({ success: true, message: "Form Submitted" })

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

    const data = await Partner.find();
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

    const data = await Partner.findById(id);
    if (!data) {
        return res.status(400).json({ success: false, message: "Data not found" })
    }

    await Partner.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted Successfully." })
}))

module.exports = router;