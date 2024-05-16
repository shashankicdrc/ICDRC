const express = require("express");
const adminRouter = express.Router();
const {
  Admins,
  DeleteAdmin,
  ChangeAdminRole,
  ChangeAdminPassword,
} = require("../../Controller/admin");
const mainAdminMiddleware = require("../../middlewares/mainAdminMiddleware");

adminRouter.get("/", mainAdminMiddleware, Admins);
adminRouter.delete("/", mainAdminMiddleware, DeleteAdmin);
adminRouter.put("/roles", mainAdminMiddleware, ChangeAdminRole);
adminRouter.post("/change/password", mainAdminMiddleware, ChangeAdminPassword);

module.exports = adminRouter;
