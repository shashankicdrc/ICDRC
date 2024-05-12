const express = require("express");
const adminRouter = express.Router();
const {
  Admins,
  DeleteAdmin,
  ChangeAdminRole,
} = require("../../Controller/admin");
const mainAdminMiddleware = require("../../middlewares/mainAdminMiddleware");

adminRouter.get("/", mainAdminMiddleware, Admins);
adminRouter.delete("/", mainAdminMiddleware, DeleteAdmin);
adminRouter.put("/roles", mainAdminMiddleware, ChangeAdminRole);

module.exports = adminRouter;
