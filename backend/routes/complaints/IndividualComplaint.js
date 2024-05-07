const express = require("express");
const { IndividualComplaint } = require("..//..//models/IndividualComplaint");
const Individualrouter = express.Router();
var nodemailer = require("nodemailer");
const { User } = require("..//..//models/User");
const verifyToken = require("..//..//utils/verifyToken");
const { fetchUser } = require("../../middlewares/fetchUser");
const adminValidation = require("../../middlewares/adminValidation");

const policyTypeToEmail = {
  "Life Insurance": "lifeinsurance@icdrc.in",
  "Health Insurance": "kartikey090803@gmail.com",
  "Motor Insurance": "motorinsurance@icdrc.in",
  "Travel Insurance": "travelinsurance@icdrc.in",
  "Agriculture Insurance": "agricultureinsurance@icdrc.in",
  "Fire Insurance": "fileinsurance@icdrc.in",
  "Marine Insurance": "marineinsurance@icdrc.in",
  "Liability Insurance": "liabilityinsurance@icdrc.in",
  "Cyber Insurance": "cyberinsurance@icdrc.in",
  "Personal Accident Insurance": "personalaccidentinsurance@icdrc.in",
  "Property Insurance": "propertyinsurance@icdrc.in",
};

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kartikey.chaudhary.webdesys@gmail.com",
    pass: "pulz gygf jlct ragt",
  },
});

Individualrouter.post("/", async (req, res) => {
  const {
    name,
    mobile,
    email,
    country,
    state,
    city,
    address,
    language,
    policyCompany,
    policyType,
    problem,
    problemDetails,
    transactionId,
  } = req.body;
  try {
    let user = await IndividualComplaint.create({
      name,
      mobile,
      email,
      country,
      state,
      city,
      address,
      language,
      policyCompany,
      policyType,
      problem,
      problemDetails,
      transactionId,
    });
    res.status(200).json({ data: user });

    let emailRecipient = email;
    if (!policyTypeToEmail[email]) {
      emailRecipient = policyTypeToEmail[policyType];
    }

    if (emailRecipient) {
      const mailOptions = {
        from: "kartikey.chaudhary.webdesys@gmail.com",
        to: [emailRecipient, user.email, "aditiyachaudhary496@gmail.com"],
        subject: " New Individual Complaint Register ",
        text: `A new individual complaint has been submitted.`,
        html: `
        <h2>New Individual Complaint Registered</h2>
        <p>A new individual complaint has been submitted.</p>
        <h3>Details:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Language:</strong> ${language}</p>
        <p><strong>Policy Company:</strong> ${policyCompany}</p>
        <p><strong>Policy Type:</strong> ${policyType}</p>
        <p><strong>Problem:</strong> ${problem}</p>
        <p><strong>Problem Details:</strong> ${problemDetails}</p>
    `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("1234");
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

Individualrouter.get("/", fetchUser, async (req, res) => {
  try {
    const complaints = await IndividualComplaint.find({ _id: req.id }).select(
      "-_id name mobile email country state city address language policyCompany policyType problem problemDetails createdAt transactionId",
    );
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

Individualrouter.get("/all", adminValidation, async (req, res) => {
  const complaints = await IndividualComplaint.find();
  return res.status(200).json({ data: complaints });
});

module.exports = { Individualrouter };
