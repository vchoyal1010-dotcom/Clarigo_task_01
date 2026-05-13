import jwt from "jsonwebtoken";

export const authentication=async(req,res,next)=>{
    try{
        const token =req.header.authorization.split(" ")[1];
         if(!token){
            return res.status(401).json({
                success:false,
                message:"token not dound"
            })
         }
         const key=jwt.verify(token,process.env.SECRET_KEY);
         if(!key){
            return res.status(401).json({
                success:false,
                message:"invalid token"
            })
         }
            req.user=key;
            next();
        

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}