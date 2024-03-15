const express = require("express");
const {IndividualComplaint} = require("..//..//models/IndividualComplaint")
const Individualrouter = express.Router();
var nodemailer = require('nodemailer');
const {User} = require("..//..//models/User")

const policyTypeToEmail = {
  'Life Insurance': 'lifeinsurance@icdrc.in',
  'Health Insurance': 'kartikey090803@gmail.com',
  "Motor Insurance": "motorinsurance@icdrc.in",
  "Travel Insurance": "travelinsurance@icdrc.in",
  "Agriculture Insurance": "agricultureinsurance@icdrc.in",
  "File Insurance": "fileinsurance@icdrc.in",
  "Marine Insurance": "marineinsurance@icdrc.in",
  "Liability Insurance": "liabilityinsurance@icdrc.in",
  "Cyber Insurance": "cyberinsurance@icdrc.in",
  "Personal Accident Insurance": "personalaccidentinsurance@icdrc.in",
  "Property Insurance": "propertyinsurance@icdrc.in",
};

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kartikey.chaudhary.webdesys@gmail.com',
    pass: 'pulz gygf jlct ragt'
  }
});

Individualrouter.post("/", async (req, res) => {
  console.log("123");
  const { name, mobile, email, country, state,city, address,language, policyCompany, policyType, problem, problemDetails } = req.body;
  
  {
     
    try {
      const loggedInUser = req.user;

      let user = await IndividualComplaint.create({  name, mobile, email, country, state, city, address, language, policyCompany, policyType, problem, problemDetails });
      res.send({
          message: "User conplaint created",
          status: 1,
      });

      let emailRecipient = email;
        if (!policyTypeToEmail[email]) {
          emailRecipient = policyTypeToEmail[policyType];
        }

      if (emailRecipient) {
        const mailOptions = {
            from: 'kartikey.chaudhary.webdesys@gmail.com',
            to: emailRecipient,
            subject: ' New Individual Complaint Register ',
            text: `A new individual complaint has been submitted.` ,
            text : `Details: ${JSON.stringify(req.body)}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("1234");
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
} 
    catch (error) {
      console.log("12345");
      res.send({
       
        message: error.message,
        status: 0,
      });
    }
  };
});

module.exports = { Individualrouter };


