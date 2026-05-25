const express = require("express");
const { asyncError } = require("../../middlewares/error");
const Contact = require("../../models/Contact");
const verifyToken = require("../../utils/verifyToken");
const {
  htmlTemplate,
  MailFilePath,
  NOREPLYEMAIL,
  NewRegrecipients,
} = require("../../utils/Mail");
const { fork } = require("child_process");

const router = express.Router();

// create contact
router.post(
  "/",
  asyncError(async (req, res) => {
    const { name, email, mobile, whatsapp, message } = req.body;
    if (!name || !email || !mobile || !whatsapp || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter all fields." });
    }

    const contactData = await Contact.create({
      name,
      email,
      mobile,
      whatsapp,
      message,
    });

    const emailData = {
      name: contactData.name,
      email: contactData.email,
      mobile: contactData.whatsapp,
      content: contactData.message,
      date: contactData.createdAt.toLocaleString(),
    };

    const emailTemplate = htmlTemplate(
      `template/contact/index.html`,
      emailData,
    );
    const emailTemplate2 = htmlTemplate(
      `template/contact/client.html`,
      emailData,
    );

    const emailMessage = {
      mailOptions: {
        from: NOREPLYEMAIL,
        to: NewRegrecipients, // Specify recipient email address
        subject: "New Contact Form Submission on ICDRC Website",
        html: emailTemplate,
      },
    };
    const emailMessage2 = {
      mailOptions: {
        from: NOREPLYEMAIL,
        to: [contactData.email], // Specify recipient email address
        subject: "Acknowledgement of Your Inquiry at ICDRC",
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

    return res.status(201).json({ success: true, message: "Message sent" });
  }),
);

// get chat bot data
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

    const data = await Contact.find();
    data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return res.status(200).json({ success: true, count: data.length, data });
  }),
);

// delete chat bot data
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

    const data = await Contact.findById(id);
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }

    await Contact.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted Successfully." });
  }),
);

module.exports = router;

