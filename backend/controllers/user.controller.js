import userSchema from "../models/user.model.js"; 
import productSchema from "../models/product.model.js";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

export const Registration = async (req, res) => {
  try {
    const { email, name, password, confirmpass } = req.body;

    
    if (!email || !name || !password || !confirmpass || !(password.length==6)) {
      return res.status(400).json({
        message: "All fields are required and password must be 6 characters"
      });
    }


    if (password !== confirmpass) {
      return res.status(400).json({
        success: false,
        message: "Confirm your password again"  
      });
    }

    
    const existingUser = await userSchema.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }


    await userSchema.create({
      email : email.toLowerCase(),
      name:name.trim(),
      password, 
      role:"user"
    });

    
    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

   } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// export const Registration=async(req,res)=>{
//     try {
//         const {email,name,password,confirmpass}=req.body;

//         if(!email||!name||!password || password.length < 6){
//             return res.status(400).json({
//                 message:"All fields are required and password must be 6 charactors"
//             });
//         }
//          if(password!==confirmpass){
//             return res.status(400).josn({
//                 success:false,
//                 message:"confirm you password again !!!!"
//             })
//          }
//         const user=await userSchema.findOne({email});
//         if(user){
//             return res.status(400).json({message:"User already exists"});
//         }
//         const login=await userSchema.create({
//             email,
//             name,
//             password,
//             confirmpass,
//             role:"user"
//         });

        
//         res.status(201).json({
//             success:true,
//             message:"user Registered successfully",
        
//         });
//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message:error.message});
//     }
// }

// export const Login=async(req,res)=>{
//     try {
//         const {email,name,password}=req.body;

//        if( !password || password.length < 6){
//             return res.status(400).json({
//                 message:"All fields are required and password must be 6 charactors"
//             });
//         }
//     const user = await userSchema.findOne({ $or: [{ email }, { name }], password: password});
//         if(!user){
//             return res.status(400).json({message:"insert correct data"});
//         }
//         const key=user.email;
//         const token=jwt.sign({key},process.env.JWT_SECRET_KEY);
//         res.status(201).json({
//             message:" login succesfull",
//             user,
//             token
//         });
//     } catch (error) {

//         res.status(500).json({message:error.message});
//     }
// }
export const Login = async (req, res) => {
  try {
    const { email, name, password } = req.body;
      

    if ((!email && !name) || !password || !(password.length ==6)) 
      {
      return res.status(400).json({
        message: "Provide email/name and valide password"
      });
    }
      
    
    const user = await userSchema.findOne({
      $or: [{ email:email?.toLowerCase() }, { name }]
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email:user.email

      },
      process.env.JWT_SECRET_KEY,
    
    );

    res.status(200).json({
      success:true,
      message: "Login successful",
      token,
      user: {
          name: user.name,
          _id: user._id,
          Status: user.Status,
          email: user.email,
          role:user.role
      },
      address:user.address,
      role: user.role,
      redirect: user.role === "admin" ? "/adminDash" : "/"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const forgatePassword=async(req,res)=>{
    try{
        const{email,name,newpassword,confirmpass}=req.body;
        
        if((!email && !name) || !newpassword ||!confirmpass){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        const user =await userSchema.findOne({$or:[{email},{name}]});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        if(newpassword!==confirmpass){
          return res.status(400).json({
              success:false,
              message:"password doesnt match your confirm password"
          })
        }

        user.password=newpassword;

        await user.save();
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

export const GetUsers=async(req,res)=>{
    try{
        const user=await userSchema.find({role:"user"});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"None of user registered till yet"
            })
        }
        res.status(200).json({
            success:true,
            message:"data found",
            user
        })
    }
    catch(err){
        res.status(500).json({
          success:false,
          message:err.message  
        })
    }
}

export const deleteuser=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!id){
           return res.status(400).json({
                success:false,
                message:"id not found"
            })
        }
        const user=await userSchema.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"id not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"user deleted"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const userstatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userSchema.findById(userId);
     
    if (!user) return res.status(404).json({ message: "User not found" });

    
    user.Status = !user.Status; 
    await user.save();

    res.status(200).json({ Status: user.Status }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStatus = async (req, res) => {
    try {
        const  userId  = req.params.userId;
       
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "id not found"
            });
        }

        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "user status found",
            user   
        });

    } catch (err) {
        return res.status(500).json({   
            success: false,
            message: err.message
        });
    }
};

 export const buyProducts = async (req, res) => {
  try {
      const { userId,totalOrders, totalSpent } = req.body;
      
    
      const user = await userSchema.findById(userId);
      
      if (!user) {
          return res.status(404).json({
              success:false,
              message: "User not found"
            });
        }
        
    
        user.totalOrders = user.totalOrders + 1;
        
    
        user.totalSpent = user.totalSpent + totalSpent;
        
        await user.save();
        
        
        for (let item of totalOrders) {
            const product = await productSchema.findById(item.productId);
            
            
      if (!product) {
       return res.status(404).json({
        success:false,
        message:"product id not find"
       })
      }

      product.quantity = product.quantity - item.quantity;
      await product.save();
    }

    res.status(200).json({
        success:true,
         message: "Order placed successfully"
         });

  } catch (error) {

    res.status(500).json({
        success:false,
         message: "Server error"
         });
  }
};


export const updateUser=async(req,res)=>{
  try{
    const {id}=req.params;
    const user=await userSchema.findByIdAndUpdate(id,req.body);
    if(!user){
      return res.status(400).json({
        success:false,
        message:"id not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Profile Updated Successfully",
      user
    })
   
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export const getAddress=async(req,res)=>{
  try{
    const {id}=req.params;
    const user=await userSchema.findById(id);
    if(!user){
      return res.status(400).json({
        success:false,
        message:"id not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"user address found",
      user
    })
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
  })
  }
}

export const saveImg=async(req,res)=>{
  try{
  
    const {userId}=req.params;
  if(!userId || !req.file){
    return res.status(400).json({
      success:false,
      message:"Must provide user id and image file"
    })
  }
    const result=await cloudinary.uploader.upload(req.file.path);
    if(!result){
      return res.status(400).json({
        success:false,
        message:"image not uploaded"
      })
    }
    const image=result.secure_url;
    console.log(image);
    console.log(userId)
    const user=await userSchema.findByIdAndUpdate(userId,{image:image});
    console.log(!user);
    if(!user){
      return res.status(400).json({
        success:false,
        message:"user not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"image uploaded successfuly",
    })
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export const showimage=async(req,res)=>{
  try
  {
    const {userId}=req.params;
    if(!userId){
      return res.status(400).json({ 
        success:false,
        message:"id not found"
      })
    }
    const user=await userSchema.findById(userId);
    if(!user){
      return res.status(400).json({
        success:false,
        message:"id not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"user image found",
      user:user.image
    })

  }
  catch(err)
  {
    return res.status(500).json({
      success:false,
      message:err.message
    })
}
}