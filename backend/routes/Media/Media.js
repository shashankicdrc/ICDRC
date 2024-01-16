const express = require('express');
const { asyncError } = require('../../middlewares/error');
const Media = require('../../models/Media');
const verifyToken = require('../../utils/verifyToken');

const router = express.Router();


// create Media
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
    // creating the project
    await Media.create(req.body);

    res.status(201).json({
        success: true,
        message: "Media Added",
    })

}))

// get all  Media
router.get('/', asyncError(async (req, res) => {
    const medias = await Media.find();
    medias.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.status(200).json({ success: true, data: medias });
}))

// delete Media
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

    const data = await Media.findById(id);
    if (!data) {
        return res.status(400).json({ success: false, message: "Data not found" })
    }

    await Media.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted Successfully." })
}))

module.exports = router;