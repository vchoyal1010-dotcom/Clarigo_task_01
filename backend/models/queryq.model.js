import mongoose from "mongoose";
const querySchema=new mongoose.Schema({
    firstName:{
              type:String,
              // required:true,
              default:null
             },
    lastName:{
             type:String,
              // required:true,
              default:null
            },
    email:{
           type:String,
          //  required:true,
           default:null
         },
    phoneNumber:{
             type:Number,
            //  required:true,
             default:null
              },
    message:{
            type:String,
            //  required:true
            }
    
    
},
{timestamps:true})
export default mongoose.model("query",querySchema);