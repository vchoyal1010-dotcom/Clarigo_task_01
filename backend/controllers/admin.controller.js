import adminSchema from "../models/admin.model.js";
import jwt from "jsonwebtoken"
export const register=async(req,res)=>{
    try{
        const {name,email,password,confirmpass}=req.body;
        if(!name || !email || !password || !(password.length==6)){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })        
        }

        if(password!==confirmpass){
            return res.status(400).json({
                success:false,
                message:"confirm your password again!!!"
            })
        }
        const admin=await adminSchema.findOne({email});
        if(admin){
            return res.status(400).json({
                success:false,
                message:"admin is already exist"
            })
        }

        const newadmin=await adminSchema.create(req.body);

        if(!newadmin)
            {
            return res.status(404).json({
                success:false,
                message:"admin is not created"
            })
        }

        res.status(201).json({
            success:true,
            message:"admin is created successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const login=async(req,res)=>{
    try{
        const {email,name,password}=req.body;
        if(!password || !(password.length==6)){
            return res.status(400).json({
                success:false,
                message:"all fields are required and password must be 6 charactors"
            })
        }

        const admin=await adminSchema.findOne({$or:[{email},{name}]},{password});
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"insert correct data"
            })
        }
        const abd=admin.email;
      const admintoken=jwt.sign({abd},process.env.JWT_SECRET_KEY);

        return res.status(201).json({
            success:true,
            message:"login successful",
            admintoken
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const forgatePassword=async(req,res)=>{
    try{
        const{email,name,newpassword}=req.body;
        
        if((!email && !name) || !newpassword){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        const admin =await adminSchema.findOne({$or:[{email},{name}]});
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"admin not found"
            })
        }
        admin.password=newpassword;
        await admin.save();
        return res.status(201).json({
            success:true,
            message:"password updated successfully"
        })
    }
        catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }