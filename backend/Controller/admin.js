const { asyncError } = require("../middlewares/error");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

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

module.exports = { Admins, DeleteAdmin, ChangeAdminRole, ChangeAdminPassword };
