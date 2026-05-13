import productSchema from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";
import categorySchema from "../models/category.model.js"
export const addProduct = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
          if (!name || !category || !price || !quantity) {
              return res.status(400).json({ message: "All fields are required" });
            }
            const files=req.files;
            let images=[];
            
            for(const file of files){
                
            const result =await cloudinary.uploader.upload(file.path);
            
            images.push(result.secure_url)
               
            }

          const product = await productSchema.create({
            name,
            category,
            price,
            quantity,
            images

        });
        res.status(201).json({ message: "Product added successfully", product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getProducts = async (req, res) => {
    try {
        const products = await productSchema.find();
        if(!products){
            return res.status(404).json({ 
              success:false,
              message: "No products found" });
        }
        res.status(200).json({
          success:true,
          message: "Products fetched successfully",
           products });
    } catch (error) {
        res.status(500).json({ 
          success:false,
          message: error.message });
    }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id didn't find"
      });
    }

    const files = req.files;
    let updateData = { ...req.body };

    if (files && files.length > 0) {
      const images = [];

      for (let file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push(result.secure_url);
      }

      updateData.images = images; 
    }

    const product = await productSchema.findByIdAndUpdate(
      id,
      updateData,  
      { new: true } 
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProduct =async(req,res)=>{
    try{
        const {id} = req.params;
         if (!id) {
            return res.status(404).json({ 
              success:false,
              message: "Product  id not find" });
        }
       
        const product = await productSchema.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
              success:false,
              message: "Product not delete" });
        }
        res.status(200).json({ 
          success:true,
          message: "Product deleted successfully",
           product });
    } catch (error) {
        res.status(500).json({ 
          success:false,
          message: error.message 
        });
    }
}

export const addCategory = async (req, res) => {
  try {
    
    const { category } = req.body;

    if (!category || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Category and file is required"
      });
    }

    const categoryExist = await categorySchema.findOne({ category });

    if (categoryExist) {
      return res.status(400).json({
        success: false,
        message: "category already exists"
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newcategory = await categorySchema.create({
      category,
      image: result.secure_url
    });

    if (!newcategory) {
      return res.status(400).json({
        success: false,
        message: "category not created"
      });
    }

    return res.status(200).json({
      success: true,  
      message: "new category created",
      data: newcategory
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const showCategory=async(req,res)=>{
    try{
        const show=await categorySchema.find();
        if(!show){
            return res.status(400).json({
                success:false,
                message:"category not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Categories found",
            show
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })

    }
}
export const deleteCategory=async(req,res)=>{
    try{
        const {id}=req.params;
        
        if(!id){
          return  res.status(400).josn({
                   success:false,
                   message:"category id not find"
            })
        }

        const cat=await categorySchema.findByIdAndDelete(id);
        if(!cat){
           return res.status(400).json({
                 success:false,
                 message:"category not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"category deleted"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const productstatus = async (req, res) => {
  try {
    const Id = req.params.id;
    const product = await productSchema.findById(Id);

    if (!product) return res.status(404).json({
      success:false,
      message: "User not found"
     });

    
    product.Status = !product.Status; 
    await product.save();

    res.status(200).json({ 
      success:true,
      message:"status updated!!",
      Status: product.Status }); 
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};