import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [category,setCategory] = useState("");
  const [price,setPrice] = useState("");
  const [quantity,setQuantity] = useState("");
  const [image,setImage] = useState(null);

  const addProduct = async (e) => {

    e.preventDefault();

    try{

      const formData = new FormData();

      formData.append("name",name);
      formData.append("category",category); // must match backend
      formData.append("price",price);
      formData.append("quantity",quantity);
      formData.append("image",image);

      await axios.post(
        "http://localhost:6002/product/save",
        formData
      );

      alert("Product Added Successfully");
      
    //   navigate("/dashboard");

    }
    catch(err){
      console.log(err);
    }

  };

  return (

    <div style={{padding:"40px"}}>

      <button onClick={()=>navigate("/dashboard")}>
        Back
      </button>

      <h2>Add Product</h2>

      <form onSubmit={addProduct}>

        <input
        type="text"
        placeholder="Product Name"
        onChange={(e)=>setName(e.target.value)}
        />

        <br/><br/>

        <input
        type="text"
        placeholder="Category"
        onChange={(e)=>setCategory(e.target.value)}
        />

        <br/><br/>

        <input
        type="number"
        placeholder="Price"
        onChange={(e)=>setPrice(e.target.value)}
        />

        <br/><br/>

        <input
        type="number"
        placeholder="Quantity"
        onChange={(e)=>setQuantity(e.target.value)}
        />

        <br/><br/>

        <input
        type="file"
        accept="image/*"
        onChange={(e)=>setImage(e.target.files[0])}
        />

        <br/><br/>

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>

  );
}

export default Product;