const express = require('express');
const router = express.Router();
const User =require("..//..//models//User")
const nodemailer = require('nodemailer');


//  this function is for genrating otp everytime
function generateCode() {
    console.log("1")
    return Math.floor(10000 + Math.random() * 90000);
}

// bro this for send code by mail 
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kartikey.chaudhary.webdesys@gmail.com',
        pass: 'pulz gygf jlct ragt'
    }
});

// kartikey Route for sending password reset email
router.post('/send', async (req, res) => {
    console.log("1")

    const { emailId } = req.body;

    try {
        // Check if the user with the provided email exists
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a random code
        const code = generateCode();

        // Send email with the code
        const mailOptions = {
            from: 'kartikey.chaudhary.webdesys@gmail.com',
            to: emailId,
            subject: ' Password Reset Code',
            text: `Hey, we saw you have a send a request for reset password, reset code is: ${code} ICDRC Dev team.`
        };

        await transporter.sendMail(mailOptions);

        // Update user document with the code
        user.resetPasswordCode = code;
        await user.save();

        res.status(200).json({ message: 'Password reset code sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Route for verifying and updating password
router.post('/verify', async (req, res) => {
    const { emailId, code, newPassword } = req.body;

    try {
        // Find user by email and reset code
        const user = await User.findOne({ emailId, resetPasswordCode: code });
        if (!user) {
            return res.status(404).json({ message: 'Invalid code or email' });
        }

        // Check if the code is expired (you may want to add expiration logic)
        // if (user.resetPasswordExpires < Date.now()) {
        //     return res.status(400).json({ message: 'Code expired' });
        // }

        // here kartikey we Update user's password
        user.password = newPassword;
        // Clear the reset code and expiration
        user.resetPasswordCode = undefined;
        // user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;









module.exports = router;
