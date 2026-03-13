import express from "express";
import multer from "multer";
import { addProduct,getProducts } from "../controllers/product.controller.js";
const productRouter=express.Router();
import upload from "../middlewares/upload.js";


productRouter.post("/save", upload.single("image"), addProduct);
productRouter.get("/all",getProducts);
export default productRouter;