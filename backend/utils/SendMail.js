const nodemailer = require("nodemailer");
const { NOREPLYEMAIL } = require("./Mail");

let transporter = nodemailer.createTransport({
  host: "mail.icdrc.in",
  port: 465,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: NOREPLYEMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = async (mailOptions) => {
  try {
    let info = await transporter.sendMail(mailOptions);
    return { info };
  } catch (error) {
    return { error };
  }
};

process.on("message", async (message) => {
  console.log("message triggred");
  let { info, error } = await sendMail(message.mailOptions);
  error
    ? process.send?.({ error, statusCode: 400 })
    : process.send?.({ data: info });
});
