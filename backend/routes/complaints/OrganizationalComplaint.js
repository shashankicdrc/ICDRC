const express = require("express");
const {
  OrganizationalComplaint,
} = require("..//..//models/OrganizationalComplaint");
const Organizationalrouter = express.Router();
var nodemailer = require("nodemailer");
const asyncError = require("../../middlewares/error");
const {
  htmlTemplate,
  MailFilePath,
  NewRegrecipients,
  NOREPLYEMAIL,
} = require("../../utils/Mail");
const { fork } = require("child_process");

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

Organizationalrouter.post("/", async (req, res) => {
  console.log("123");
  const {
    organization_name,
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

  {
    try {
      let user = await OrganizationalComplaint.create({
        organization_name,
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

      let emailRecipient = email;
      if (!policyTypeToEmail[email]) {
        emailRecipient = policyTypeToEmail[policyType];
      }

      if (emailRecipient) {
        const caseData = {
          name: user.organization_name,
          email: user.email,
          mobile: user.mobile,
          date: user.createdAt.toLocaleString(),
        };
        const html = htmlTemplate(
          "template/organisational/NewRegTeam.html",
          caseData,
        );
        const NewMessage = {
          mailOptions: {
            from: NOREPLYEMAIL,
            to: [...NewRegrecipients],
            subject:
              "New Registration Form Submission on ICDRC Website for an Organisation",
            html,
          },
        };

        const sendMail = fork(MailFilePath);
        sendMail.send(NewMessage);
        sendMail.on("message", (msg) => {
          if (msg.error) {
            console.error(msg.error.response);
          } else if (msg.data) {
            console.log(msg.data.response);
          }
        });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      console.log("12345");
      res.send({
        message: error.message,
        status: 0,
      });
    }
  }
});

// Route to get all organizational complaints with details and timestamp
Organizationalrouter.get("/all", async (req, res) => {
  try {
    const complaints = await OrganizationalComplaint.find()
      .sort({ createdAt: -1 })
      .exec();
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { Organizationalrouter };
