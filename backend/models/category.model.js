import mongoose from "mongoose";
const categoryadd=new mongoose.Schema({
    category:{
        type:String,
        required:true,
        unique:true
    },
    image:{
    type:String,
    required:true
}
},
{timestamps:true})
export default mongoose.model("category",categoryadd);