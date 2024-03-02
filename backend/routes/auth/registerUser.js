const express = require('express');
const { asyncError } = require('../../middlewares/error');
const User = require("..//..//models/User")
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/', asyncError(async (req, res) => {
    const { emailId, name, password } = req.body;

    if (!name || !emailId || !password) return res.status(200).json({ success: false, message: "Please enter all fields." });

    // finding the user if he/she exist or not
    let user = await User.findOne({ emailId });
    if (user) {
        return res.status(400).json({ success: false, message: "User already registered with this Email Id." });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // creating the user
    user = await User.create({
        name, emailId, password: hashedPassword,
    });

    res.status(201).json({
        success: true,
        message: "Registered Successfully"
    })
}))

module.exports = router;