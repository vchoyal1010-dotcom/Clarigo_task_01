import cloudinary from "../config/cloudinary.js";
import ordersModel from "../models/orders.model.js";


export const saveOrder=async(req,res)=>{
    try{
        const {totalAmount,customerName}=req.body;
        const files=req.files;
        let images=[];
        for(const file of files){
            const result =await cloudinary.uploader.upload(file.path);
            images.push(result.secure_url)
        }
        const order=await ordersModel.create({...req.body,images});
        if(!order){
            return res.status(404).json({
             success:false,
             message:"order not created"
            })
        }
        return res.status(200).json({
            success:true,
            message:"order created",
            order
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const getall=async(req,res)=>{
    try{
        const order=await ordersModel.find();
        if(!order){
            return res.status(404).json({
             success:false,
             message:"order not find"
            })
        }
        return res.status(200).json({
            success:true,
            message:"order found",
            order
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const deleteorder=async(req,res)=>{
    try{
        const {id}=req.params;
         if(!id){
            return res.status(404).json({
             success:false,
             message:"order id not find"
            })
        }
        const order=await ordersModel.findByIdAndDelete(id);
        if(!order){
            return res.status(404).json({
             success:false,
             message:"order not find"
            })
        }
        return res.status(200).json({
            success:true,
            message:"order deleted"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const updateOrder=async(req,res)=>{
    try{
        const {id}=req.params;
         if(!id){
            return res.status(404).json({
             success:false,
             message:"order id not find"
            })
        }
        const order=await ordersModel.findByIdAndUpdate(id);
        if(!order){
            return res.status(404).json({
             success:false,
             message:"order not find"
            })
        }
        return res.status(200).json({
            success:true,
            message:"order updated "
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const userOrder=async(req,res)=>{
    try{
        const {userId}=req.params;
        const orders=await ordersModel.find({userId});
        if(!orders){
            return res.status(404).json({
                success:false,
                message:"you have not ordered anything yet"
            })
        }
        return res.status(200).json({
            success:true,
            message:"your orders",
            orders
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}