import express from "express";
import {register,login,forgatePassword} from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/admin.middleware.js";
const adminRouter =express.Router();
adminRouter.post("/register",register);
adminRouter.post("/logina",login);
adminRouter.post("/forgotpass",forgatePassword);
adminRouter.get("/adminauth",authAdmin,(req, res) => {
  res.json({ success: true });
});
export default adminRouter;