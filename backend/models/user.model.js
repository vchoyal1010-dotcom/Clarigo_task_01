import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true   
    },
    email:{
        type:String,        
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
     role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    totalOrders: {
         type: Number,
         default: 0
    },

    totalSpent: {
         type: Number,
         default: 0
    },
    address: [
    {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
        {default:null}
    ],
    phoneNumber:{
        type:String,
        default:null
    },
    
    createdAt: {
          type: Date,
          default: Date.now
    },
    Status:{
          type:Boolean,
          default:true
    },
    image:{
        type:String,
        default:null
    }

},
    {timestamps:true}   
)
export default mongoose.model("User",userSchema);
