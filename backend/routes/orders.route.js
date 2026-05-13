import express from "express";
import {saveOrder,getall,deleteorder,updateOrder,userOrder} from "../controllers/orders.controllers.js";
import upload from "../middlewares/upload.js";
const orderRouter=express.Router();

orderRouter.post("/save",upload.array("images", 3),saveOrder);
orderRouter.get("/all",getall);
orderRouter.delete("/delete/:id",deleteorder);
orderRouter.put("/updated/:id",updateOrder);
orderRouter.get("/userorders/:userId",userOrder)
export default orderRouter;