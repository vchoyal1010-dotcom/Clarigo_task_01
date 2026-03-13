import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
dotenv.config();
connectDB();
import cors from "cors";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

const app=express();
app.use(express.json());
app.use(cors());
app.use("/user",userRouter);
app.use("/product",productRouter);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}); 
