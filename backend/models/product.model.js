import mongoose from "mongoose";
const productSchema =new mongoose.Schema({
    name:{
          type:String,
          required:true
        },
    category:{
            type:String,
            required:true
            },
    price:{
          type:Number,
          required:true
          },
    quantity:{
             type:Number,
             required:true   
             },
    images:[
           String,
      
        ],
   
    Status:{
          type:Boolean,
          default:true
          }




     },
      {timestamps:true});
export default mongoose.model("Product",productSchema);