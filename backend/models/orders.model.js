// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   productId:{type:String},
//   quantity:{type:Number},
//   customerName:{type: String},
//   totalAmount:{type: Number},
//   status: {
//     type: String,
//     default: "Completed"
//   },
//   paymentStatus: {
//     type: String,
//     default: "Paid"
//   }
// },
// {timestamps:true});


// export default mongoose.model("Order",orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orders: [
    {
      productId: { type: String },
      productName:{type:String},
      quantity: { type: Number },
      price:{type:String},
      images:[String],
      }
      ],
 
     customerName: { type: String },
      totalAmount: { type: Number },
      userId:{type:String},
       status: {
        type: String,
        default: "Completed"
      },
       paymentStatus: {
             type: String,
            default: "Paid"
             }
         },
        { timestamps: true });

export default mongoose.model("Order", orderSchema);