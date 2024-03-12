const express = require('express');
const { asyncError } = require('../../middlewares/error');
const User =require("../../models/User")
const router = express.Router()
const bcrypt = require('bcrypt')
const generateToken = require('../../utils/generateToken')

router.post('/', asyncError(async (req, res) => {
    const { emailId, password } = req.body;

    if (!emailId || !password) return res.status(400).json({ success: false, message: "Please enter all fields." });

    // finding the user if he/she exist or not
    let user = await User.findOne({ emailId }).select("+password");
    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    // matching the password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    // generating the token
    const token = generateToken(user._id, user.name, user.emailId);

    res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}`,
        token
    })
}))

module.exports = router;