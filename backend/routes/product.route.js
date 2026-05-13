import express from "express";
import multer from "multer";
import { addProduct,getProducts,updateProduct,deleteProduct,addCategory,showCategory, productstatus,deleteCategory} from "../controllers/product.controller.js";
const productRouter=express.Router();
import upload from "../middlewares/upload.js";


productRouter.post("/save", upload.array("images",3), addProduct);
productRouter.get("/all",getProducts);
productRouter.put("/update/:id",upload.array("images",3),updateProduct); 
productRouter.delete("/delete/:id",deleteProduct);
productRouter.post("/addCategory",upload.single("image"),addCategory);
productRouter.get("/showAll",showCategory);
productRouter.put("/status/:id",productstatus);
productRouter.delete("/deletecat/:id",deleteCategory);

export default productRouter;