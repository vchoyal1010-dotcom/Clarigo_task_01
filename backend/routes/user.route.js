import express from "express";
import { Registration,Login } from "../controllers/user.controller.js"; 
const userRouter=express.Router();
userRouter.post("/registered",Registration);
userRouter.post("/logink",Login);
  
export default userRouter;
