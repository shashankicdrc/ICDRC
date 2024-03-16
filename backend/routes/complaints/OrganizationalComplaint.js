const express = require("express");
const {OrganizationalComplaint} = require("..//..//models/OrganizationalComplaint")
const Organizationalrouter = express.Router();
var nodemailer = require('nodemailer');

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

Organizationalrouter.post("/", async (req, res) => {
  console.log("123");
  const { organization_name, mobile, email, country, state,city, address,language, policyCompany, policyType, problem, problemDetails ,transactionId} = req.body;
  
  {
     
    try {
      let user = await OrganizationalComplaint.create({ organization_name, mobile, email, country, state, city, address, language, policyCompany, policyType, problem, problemDetails,transactionId });
      res.send({
          message: "Organizational conplaint created",
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
            subject: ' New  Organizational Complaint Register ',
            text: `A new  Organizational Complaint has been submitted.` ,
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





// Route to get all organizational complaints with details and timestamp
Organizationalrouter.get("/all", async (req, res) => {
  try {
    const complaints = await OrganizationalComplaint.find().select('-_id organization_name mobile email country state city address language policyCompany policyType problem problemDetails createdAt');
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { Organizationalrouter };


