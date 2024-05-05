const Admin = require("../models/Admin");

const adminValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(403)
        .json({ error: "you don't have right to access the private data." });
    }
    const adminId = token.split(" ")[1];
    const isValidAdmin = await Admin.findById(adminId, "-password");
    if (!isValidAdmin) {
      return res
        .status(403)
        .json({ error: "you don't have right to access the private data." });
    }
    req.admin = isValidAdmin;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = adminValidation;
