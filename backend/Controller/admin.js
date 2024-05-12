const { asyncError } = require("../middlewares/error");
const Admin = require("../models/Admin");

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

module.exports = { Admins, DeleteAdmin, ChangeAdminRole };
