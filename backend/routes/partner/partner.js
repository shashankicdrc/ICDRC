const express = require("express");
const { asyncError } = require("../../middlewares/error");
const Partner = require("../../models/Partner");
const verifyToken = require("../../utils/verifyToken");
const {
  htmlTemplate,
  MailFilePath,
  NOREPLYEMAIL,
  NewRegrecipients,
} = require("../../utils/Mail");
const { fork } = require("child_process");

const router = express.Router();

// create partner
router.post(
  "/",
  asyncError(async (req, res) => {
    const { name, email, mobile, company } = req.body;
    if (!name || !email || !mobile || !company) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter all fields." });
    }

    const PartnerData = await Partner.create({ name, email, mobile, company });

    const emailData = {
      name: PartnerData.name,
      email: PartnerData.email,
      mobile: PartnerData.mobile,
      company: PartnerData.company,
      date: PartnerData.createdAt.toLocaleString(),
    };

    const emailTemplate = htmlTemplate(
      `template/partner/index.html`,
      emailData,
    );
    const emailTemplate2 = htmlTemplate(
      `template/partner/client.html`,
      emailData,
    );

    const emailMessage = {
      mailOptions: {
        from: NOREPLYEMAIL,
        to: NewRegrecipients, // Specify recipient email address
        subject: "New Partner with Us Form Submission on ICDRC Website",
        html: emailTemplate,
      },
    };
    const emailMessage2 = {
      mailOptions: {
        from: NOREPLYEMAIL,
        to: [PartnerData.email], // Specify recipient email address
        subject: "Thank You for Your Interest in Partnering with ICDRC",
        html: emailTemplate2,
      },
    };

    const emailSender = fork(MailFilePath);
    emailSender.send(emailMessage);
    emailSender.on("message", (msg) => {
      if (msg.error) {
        console.error(msg.error.response);
      } else if (msg.data) {
        console.log(msg.data.response);
      }
    });

    const emailSender2 = fork(MailFilePath);
    emailSender2.send(emailMessage2);
    emailSender2.on("message", (msg) => {
      if (msg.error) {
        console.error(msg.error.response);
      } else if (msg.data) {
        console.log(msg.data.response);
      }
    });

    res.status(201).json({ success: true, message: "Form Submitted" });
  }),
);

// get partner data
router.get(
  "/",
  asyncError(async (req, res) => {
    // Token Verification
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }
    let user = verifyToken(token);
    if (!user.success) {
      return res.status(400).json({ success: false, message: user.message });
    }

    const data = await Partner.find();
    data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return res.status(200).json({ success: true, count: data.length, data });
  }),
);

// delete partner data
router.delete(
  "/:id",
  asyncError(async (req, res) => {
    // Token Verification
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }
    let user = verifyToken(token);
    if (!user.success) {
      return res.status(400).json({ success: false, message: user.message });
    }

    const id = req.params.id;

    const data = await Partner.findById(id);
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }

    await Partner.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted Successfully." });
  }),
);

module.exports = router;

