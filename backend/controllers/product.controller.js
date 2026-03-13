import productSchema from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
          if (!name || !category || !price || !quantity || !req.file) {
              return res.status(400).json({ message: "All fields are required" });
            }
            // console.log(CLOUD_NAME,CLOUD_KEY,CLOUD_SECRET_KEY);

            // image cloudinary pe upload
            console.log("Cloudinary config:", cloudinary.config());
            const result =await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {
                folder:"productImages",
                resource_type:"image"
            });

            console.log(result);

        const product = await productSchema.create({
            name,
            category,
            price,
            quantity,
            image: result.secure_url   // cloudinary image url
        });
         console.log(product);
        res.status(201).json({ message: "Product added successfully", product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getProducts = async (req, res) => {
    try {
        const products = await productSchema.find();
        console.log(products);
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
