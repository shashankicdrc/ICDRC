const Admin = require("../models/Admin");
const verifyToken = require("../utils/newVerifyToken");

const mainAdminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(403)
        .json({ error: "you don't have right to access the private data." });
    }
    const jwtToken = token.split(" ")[1];
    const isVerified = await verifyToken(jwtToken);

    if (!isVerified) {
      return res
        .status(403)
        .json({ error: "you don't have right to access the private data." });
    }
    if (isVerified.role !== "admin") {
      return res
        .status(403)
        .json({ error: "you don't have right to access the private data." });
    }
    const isAdminExist = await Admin.findById(isVerified._id).select(
      "-password",
    );
    if (!isAdminExist) {
      return res.status(401).json({ error: "Invlid token has been provided." });
    }
    req.admin = isAdminExist;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = mainAdminMiddleware;
