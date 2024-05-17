const { asyncError } = require("../middlewares/error");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const {
  htmlTemplate,
  MailFilePath,
  NewRegrecipients,
  NOREPLYEMAIL,
} = require("../utils/Mail");
const { fork } = require("child_process");
const isValidDate = require("../utils/isValidateDate");

const ResetPassword = asyncError(async (req, res) => {
  const { token, password, confirmpassword } = req.body;
  if (password !== confirmpassword) {
    return res.status(400).json({ error: "Password doesn't match." });
  }
  const isTokenexist = await Token.findOne({ token });

  if (!isTokenexist)
    return res
      .status(400)
      .json({ error: `Invalid token or link, please check it` });
  const isTokenValid = isValidDate(isTokenexist.createdAt, 10);

  if (!isTokenValid) {
    const deleteToken = await Token.findByIdAndDelete(isTokenexist._id);
    if (deleteToken && isTokenexist._id === deleteToken._id) {
      return res.status(400).json({
        error: "Token has been expired.",
      });
    }
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const updatedPassword = await Admin.findByIdAndUpdate(isTokenexist.userId, {
    password: hashPassword,
  });

  if (updatedPassword) {
    const deletedToken = await Token.findByIdAndDelete(isTokenexist._id);
    if (deletedToken) {
      return res
        .status(200)
        .json({ data: "your password has been reset successfully." });
    }
    return res.status(400).json({ error: "Invalid token is provided." });
  } else {
    return res
      .status(403)
      .json({ error: "you don't have rights to reset password." });
  }
});

const ResetPasswordRequest = asyncError(async (req, res) => {
  const { email } = req.body;
  const isAdminExist = await Admin.findOne({ emailId: email });
  if (!isAdminExist) {
    return res.status(400).json({ error: "Admin does not exist." });
  }
  const isTokenExist = await Token.findOne({ userId: isAdminExist._id });
  if (isTokenExist) {
    return res.status(400).json({
      data: `Reset password link has been already send to your email ${email}`,
    });
  }
  let tokenData = {
    email: isAdminExist.emailId,
    userId: isAdminExist._id,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  if (token) {
    const link =
      process.env.NODE_ENV === "production"
        ? `${req.headers.origin}/admin/reset/password/?token=${token}`
        : `${process.env.FRONTEND_URL}/admin/reset/password/?token=${token}`;

    const html = htmlTemplate("template/ForgetPassword.html", { link });

    const NewMessage = {
      mailOptions: {
        from: NOREPLYEMAIL,
        to: [...NewRegrecipients, isAdminExist.emailId],
        subject: "Admin forget passwrod reset link",
        html,
      },
    };

    const sendMail = fork(MailFilePath);
    sendMail.send(NewMessage);
    sendMail.on("message", async (msg) => {
      if (msg.error) {
        console.error(msg.error.response);
      } else if (msg.data) {
        console.log(msg.data.response);
        await Token.create({
          token,
          userId: isAdminExist._id,
        });
      }
    });
  }

  res.status(200).json({
    data: `Reset password email has been send to ${isAdminExist.emailId}`,
  });
});

const ChangeAdminPassword = asyncError(async (req, res) => {
  const { password, confirmpassword, newpassword } = req.body;
  if (!password || !confirmpassword || !newpassword) {
    return res.status(400).json({ error: "Fields is required." });
  }
  if (newpassword !== confirmpassword) {
    return res.status(400).json({ error: "Password does not match." });
  }
  const adminId = req.admin.id;
  const adminData = await Admin.findById(adminId);
  if (!adminData) {
    return res.status(400).json({ error: "User does not exist." });
  }

  const isMatch = await bcrypt.compare(password, adminData.password);

  // If passwords don't match, return an error
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid current password" });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newpassword, 10);

  // Update the user's password with the new hashed password
  adminData.password = hashedPassword;

  // Save the updated user object
  await adminData.save();

  // Return a success message
  return res.status(200).json({ data: "Password changed successfully" });
});

const Admins = asyncError(async (req, res) => {
  const admins = await Admin.find({}).select("-password");
  return res.status(200).json({ data: admins });
});

const DeleteAdmin = asyncError(async (req, res) => {
  const { id } = req.query;
  if (req.admin.role !== "admin") {
    return res.status(403).json({ error: "You don't have any right." });
  }
  const deleted = await Admin.findByIdAndDelete(id).select("-password");
  if (!deleted) {
    return res.status(400).json({ erro: "Account does not exist." });
  }
  return res.status(200).json({ data: deleted._id });
});

const ChangeAdminRole = asyncError(async (req, res) => {
  const { id, role } = req.body;
  if (req.admin.role !== "admin") {
    return res.status(403).json({ error: "You don't have any right." });
  }
  const updated = await Admin.findByIdAndUpdate(id, { role }).select(
    "-password",
  );
  if (!updated) {
    return res.status(400).json({ erro: "Account does not exist." });
  }
  return res.status(200).json({ data: "Role has been updated successfully." });
});

module.exports = {
  Admins,
  DeleteAdmin,
  ChangeAdminRole,
  ChangeAdminPassword,
  ResetPasswordRequest,
  ResetPassword,
};
