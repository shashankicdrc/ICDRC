const express = require("express");
const adminRouter = express.Router();
const {
  Admins,
  DeleteAdmin,
  ChangeAdminRole,
  ChangeAdminPassword,
  ResetPasswordRequest,
  ResetPassword,
} = require("../../Controller/admin");
const mainAdminMiddleware = require("../../middlewares/mainAdminMiddleware");

adminRouter.get("/", mainAdminMiddleware, Admins);
adminRouter.delete("/", mainAdminMiddleware, DeleteAdmin);
adminRouter.put("/roles", mainAdminMiddleware, ChangeAdminRole);
adminRouter.post("/change/password", mainAdminMiddleware, ChangeAdminPassword);
adminRouter.post("/reset/password/request", ResetPasswordRequest);
adminRouter.post("/reset/password", ResetPassword);

module.exports = adminRouter;
