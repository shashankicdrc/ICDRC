const express = require("express");
const { IndividualComplaint } = require("..//..//models/IndividualComplaint");
const Individualrouter = express.Router();
var nodemailer = require("nodemailer");
const { fetchUser } = require("../../middlewares/fetchUser");
const adminValidation = require("../../middlewares/adminValidation");
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

    const caseData = {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      date: user.createdAt.toLocaleString(),
    };
    const html = htmlTemplate("template/individual/NewRegTeam.html", caseData);
    const NewMessage = {
      mailOptions: {
        from: NOREPLYEMAIL,
        to: [...NewRegrecipients],
        subject:
          "New Registration Form Submission on ICDRC Website for an Individual",
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
  const complaints = await IndividualComplaint.find()
    .sort({ createdAt: -1 })
    .exec();
  return res.status(200).json({ data: complaints });
});

module.exports = { Individualrouter };
