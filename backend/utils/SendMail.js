const nodemailer = require("nodemailer");
const { NOREPLYEMAIL } = require("./Mail");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kartikey.chaudhary.webdesys@gmail.com",
    pass: "pulz gygf jlct ragt",
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
