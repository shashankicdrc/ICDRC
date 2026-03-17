const express = require('express');
const { asyncError } = require('../../middlewares/error');
const User =require("../../models/User")
const router = express.Router()
const bcrypt = require('bcrypt') 
const generateToken = require('../../utils/generateToken')


router.post('/', asyncError(async (req, res) => {
    // Support both the legacy 'emailId' and new NextAuth 'email' body format
    const emailId = req.body.emailId || req.body.email;
    const { password } = req.body;

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
        token, // legacy support
        data: {
            id: user._id, // Required by NextAuth CredentialsProvider
            email: user.emailId, // Good practice to include
            name: user.name, // Good practice to include
            AccessToken: token,
            RefreshToken: token // mock refresh token for compatibility
        }
    })
}))

module.exports = router;