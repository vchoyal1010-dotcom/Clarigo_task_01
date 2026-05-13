import querySchema from "../models/queryq.model.js";
import transporter from "../config/mailer.js";
export const addQuery=async(req,res)=>{

    try {
        const {firstName,lastName,email,phoneNumber,message}=req.body;
        // if(!firstName || !lastName || !email || !phoneNumber || !message){
        //     return res.status(400).json({message:"All fields are required"});
        // }
        const newQuery=await querySchema.create({
           ...req.body
        });
           await transporter.sendMail({
          from: req.body.email,
            to: process.env.EMAIL_USER,  
            subject: "Query arrived",
            text: `
${req.body.firstName} ${req.body.lastName} has sent a query.

Message: ${req.body.message}
Contect to: ${phoneNumber}
`
              });
await transporter.sendMail({
          from: process.env.EMAIL_USER,
            to: req.body.email,  
            subject: "Query Received",
            text: `
Dear ${req.body.firstName} ${req.body.lastName},

 We have received your query.

Message: ${req.body.message}

We will contact you soon.

    Thank you!
    Team Shopora
               `
              });
        res.status(201).json({
            success:true,
            message:"Query added successfully",
            newQuery
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }

}

export const getQueries=async(req,res)=>{
    try{
        const queries=await querySchema.find();
        if(!queries){
            return res.status(404).json({
                success:false,message:"No queries found"
            });
        }
        res.status(200).json({
            success:true,
            message:"all queries found",
            queries
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const UpdateQuery=async(req,res)=>{
    try{
        const {id}=req.params;
    if(!id){
        return res.status(400).json({
         success:false,
         message:"id is required"
        })
    }
    const query=querySchema.findById(id);
       if(!query){
          return res.status(400).json({
            success:false,
            message:"query not found"
          })
       }
       query.Status=!query.Status;
       await query.save();

       return res.status(200).json({
        success:true,
        message:"query status saved"
       })
}
catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
    })
}
   }