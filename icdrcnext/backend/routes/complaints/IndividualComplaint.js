const express = require('express');
const { asyncError } = require('../../middlewares/error');
const IndividualComplaint = require('..//..//models/IndividualComplaint');
const verifyToken = require('../../utils/verifyToken');
var nodemailer = require('nodemailer');

const router = express.Router();

const policyTypeToEmail = {
    'Life Insurance': 'lifeinsurance@icdrc.in',
    'Health Insurance': 'kartikey9949@gmail.com',
   
};



// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'kartikey.chaudhary.webdesys@gmail.com',
//     pass: 'pulz gygf jlct ragt'
//   }
// });

// create Complaint 
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

    let { name, phoneNumber, emailId, state, address, policy_company, policy_type, problem, problem_detail } = req.body;
    if (!name || !phoneNumber || !emailId || !state || !address || !policy_company || !policy_type || !problem || !problem_detail  ) {
        return res.status(400).json({ success: false, message: "Please Enter all fields." })
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kartikey.chaudhary.webdesys@gmail.com',
          pass: 'pulz gygf jlct ragt'
        }
      });
    await IndividualComplaint.create({ name, phoneNumber, emailId, state, address, policy_company, policy_type, problem, problem_detail });

    // Send email based on policy type
    const emailRecipient = policyTypeToEmail[policy_type];
    if (emailRecipient) {
        const mailOptions = {
            from: 'kartikey.chaudhary.webdesys@gmail.com',
            to: emailRecipient,
            subject: 'New Individual Complaint',
            text: `A new individual complaint has been submitted. Details: ${JSON.stringify(req.body)}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }

    res.status(201).json({
        success: true,
        message: 'Individual complain Added',
    });
}))

// get all  complaint 
router.get('/', asyncError(async (req, res) => {
    const individualComplaint = await IndividualComplaint.find({}).select('-content');
    individualComplaint.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.status(200).json({ success: true, data: individualComplaint });
}))

module.exports = router;