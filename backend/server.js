import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
dotenv.config();
connectDB();
import cors from "cors";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import adminRouter from "./routes/admin.routes.js";
import orderRouter from "./routes/orders.route.js";
import queryRoute from "./routes/query.route.js";
const app=express();
app.use(express.json());
app.use(cors());
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/customer",queryRoute);
app.use("/admin",adminRouter);
app.use("/orders",orderRouter);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}); 
