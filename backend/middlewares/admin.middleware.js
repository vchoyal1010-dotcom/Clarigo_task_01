import jwt from "jsonwebtoken";
export const authAdmin=async(req,resizeBy,next)=>{
    try{
        const admintoken=req.headers.authorization.split(" ")[1];
        if(!admintoken){
            return res.status(401).json({
                success:false,
                message:"token not found"
            })
        }
        const key=jwt.verify(admintoken,process.env.JWT_SECRET_KEY);
        if(!key){
            return res.status(401).json({
                success:false,
                message:"invailid token"
            })
        }
        req.admin=key;
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}