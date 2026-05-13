import express from "express";
import { Registration,Login,forgatePassword,GetUsers,deleteuser,userstatus,buyProducts,getStatus,updateUser,getAddress,saveImg,showimage } from "../controllers/user.controller.js"; 
import upload  from "../middlewares/upload.js";
import {authentication} from "../middlewares/user.middleware.js";
const userRouter=express.Router();
userRouter.post("/registered",Registration);
userRouter.post("/logink",Login);
 userRouter.post("/forgotpass",forgatePassword); 
 userRouter.get("/getusers",GetUsers);
 userRouter.delete("/delete/:id",deleteuser);
 userRouter.put("/status/:id",userstatus);
 userRouter.post("/stocks",buyProducts);
 userRouter.get("/userauth", authentication, (req, res) => {
  res.json({ success: true });
});

  userRouter.get("/getstatus/:userId",getStatus);
 userRouter.put("/update/:id",updateUser)
 userRouter.get("/getaddress/:id",getAddress);
 userRouter.put("/updateImage/:userId",upload.single("image"),saveImg);
 userRouter.get("/imageShow/:userId",showimage)
export default userRouter;
