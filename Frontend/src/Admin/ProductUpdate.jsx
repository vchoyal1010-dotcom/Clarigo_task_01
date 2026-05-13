import React, { useState, useEffect } from "react";
import api from '../Admin/AdminAuth';
import "./ProductUpdate.css";

function ProductUpdate({ product, onBack, refreshProducts }) {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
 
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (product) {
      setId(product._id);
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price);
      setQuantity(product.quantity);
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("quantity", quantity);
      for(let i=0;i<images.length;i++)
        {
      formData.append("images", images[i]);
        
      }
     
      const res = await api.put(
        `/product/update/${id}`,
        formData
      );

      setMessage(res.data.message || "Product updated");

      refreshProducts(); 

      setTimeout(() => {
        onBack(); 
      }, 1000);

    } catch (error) {
      console.log(error);
      setMessage("Update failed");
    }
  };
  const handleImages=(e)=>{
    const files=Array.from(e.target.files);
    setImages((prev)=>[...prev,...files])
    e.target.value=null;
  }

  return (
    <div className="prod-update-container">

      <button className="prod-update-back-btn" onClick={onBack}>
        Back
      </button>

      <h2 className="prod-update-title">Update Product</h2>

      {message && <p className="prod-update-message">{message}</p>}

      <form className="prod-update-form" onSubmit={handleUpdate}>
       <label className="prod-update-label">Product name</label>
      
        <input
          className="prod-update-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
       <label className="prod-update-label">Select category</label>
        
        <input
          className="prod-update-input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
       <label className="prod-update-label">Update price</label>
        
        <input
          className="prod-update-input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
       <label className="prod-update-label">Update quantity </label>
        
        <input
          className="prod-update-input"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
       <label className="prod-update-label">Update first image</label>
        
        <input 
        type="file" 
        multiple
         accept="image/*"
        className="prod-update-input-file"
      
        onChange={handleImages} />
         
        <div className="prod-update-preview-container">
  {images.map((img, index) => (
    <div key={index} className="prod-update-preview-box">
      
      <img
        src={URL.createObjectURL(img)}
        alt="preview"
        className="prod-update-preview-img"
      />

      <button
        type="button"
        className="prod-update-preview-remove"
        onClick={() =>
          setImages(images.filter((_, i) => i !== index))
        }
      >
        ✕
      </button>

    </div>
  ))}
</div>
       
        <button className="prod-update-submit-btn" type="submit">
          Update Product
        </button>

      </form>
    </div>
  );
}

export default ProductUpdate;