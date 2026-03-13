import userSchema from "../models/user.model.js"; 
export const Registration=async(req,res)=>{
    try {
        const {email,name,password}=req.body;

        if(!email||!name||!password || password.length < 6){
            return res.status(400).json({
                message:"All fields are required and password must be 6 charactors"
            });
        }
        const user=await userSchema.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const login=await userSchema.create({
            email,
            name,
            password
        });

        
        res.status(201).json({
            message:"user Registered successfully"
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const Login=async(req,res)=>{
    try {
        const {email,name,password}=req.body;

       if(!password || password.length < 6){
            return res.status(400).json({
                message:"All fields are required and password must be 6 charactors"
            });
        }
    const user = await userSchema.findOne({ $or: [{ email }, { name }], password: password});
        if(!user){
            return res.status(400).json({message:"insert correct data"});
        }
        res.status(201).json({message:" login succesfull",
            user});
    } catch (error) {

        res.status(500).json({message:error.message});
    }
}

