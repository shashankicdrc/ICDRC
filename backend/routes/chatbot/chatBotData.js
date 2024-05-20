const express = require("express");
const { asyncError } = require("../../middlewares/error");
const ChatBotData = require("../../models/ChatBotData");
const verifyToken = require("../../utils/verifyToken");
const {
  htmlTemplate,
  MailFilePath,
  NOREPLYEMAIL,
  NewRegrecipients,
} = require("../../utils/Mail");
const { fork } = require("child_process");

const router = express.Router();

// create chat bot data
router.post(
  "/",
  asyncError(async (req, res) => {
    const { name, email, mobile, issue } = req.body;
    if (!name || !email || !mobile || !issue) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter all fields." });
    }

    const chatData = await ChatBotData.create({ name, email, mobile, issue });

    const emailData = {
      name: chatData.name,
      email: chatData.email,
      mobile: chatData.mobile,
      content: chatData.issue,
      date: chatData.createdAt.toLocaleString(),
    };

    const emailTemplate = htmlTemplate(
      `template/chatbot/index.html`,
      emailData,
    );
    const emailTemplate2 = htmlTemplate(
      `template/chatbot/client.html`,
      emailData,
    );

    const emailMessage = {
      mailOptions: {
        from: NOREPLYEMAIL,
        to: NewRegrecipients, // Specify recipient email address
        subject: "New enquiry received in chatbot on ICDRC Website",
        html: emailTemplate,
      },
    };
    const emailMessage2 = {
      mailOptions: {
        from: NOREPLYEMAIL,
        to: [chatData.email], // Specify recipient email address
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

    res.status(201).json({ success: true, message: "Data Submitted." });
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

    const data = await ChatBotData.find();
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

    const data = await ChatBotData.findById(id);
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }

    await ChatBotData.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted Successfully." });
  }),
);

module.exports = router;
