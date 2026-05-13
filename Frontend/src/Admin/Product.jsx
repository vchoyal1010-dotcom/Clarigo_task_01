import React, { useState,useEffect } from "react";
import api from "../Admin/AdminAuth";
import "./Product.css";

function Product() {

  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
 

  const addProduct = async (e) => {
    e.preventDefault();
 console.log(e.target.files)
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
      

      await api.post("/product/save", formData);

      alert("Product Added Successfully");
      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
      setImages([]);
         
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/product/showAll");
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else if (Array.isArray(res.data.show)) {
          setCategories(res.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleImages=(e)=>{
    const files=Array.from  (e.target.files);
    setImages((prev)=>[...prev,...files]);
    e.target.value=null;
  }
  return (
    <div className="add-prodt-container">
     
    <div className="k">

      <h2 className="add-prodt-title">Add Product</h2>
    </div>

      <form className="add-prodt-form" onSubmit={addProduct}>
       <label className="add-prodt-label">Product Name</label>

        <input
          type="text"
          placeholder="Product Name"
          className="add-prodt-input"
          onChange={(e) => setName(e.target.value)}
          required
        />
       <label className="add-prodt-label">Select category</label>
          
       <select
  className="add-prodt-input"
  onChange={(e) => setCategory(e.target.value)}
  required
>              
  <option value="">Select Category</option>
              
  {categories.map((cat, index) => (
    <option key={index} value={cat.category}>
      {cat.category}
    </option>
  ))}

</select>
       <label className="add-prodt-label">Enter price</label>
         
        <input
          type="number"
          placeholder="Price"
          className="add-prodt-input"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
       <label className="add-prodt-label">Enter quantity</label>


        <input
          type="number"
          placeholder="Quantity"
          className="add-prodt-input"
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

       <label className="add-prodt-label"> Add Three Images</label>
          
        <input
          type="file"
          accept="image/*"
          multiple
          className="add-prodt-input-file"
          onChange={handleImages}
        
        />
       

        <div className="preview-container">
  {images.map((img, index) => (
    <div key={index} className="preview-box">
      
      <img
        src={URL.createObjectURL(img)}
        alt="preview"
        className="preview-img"
      />

      <button
        type="button"
        className="preview-remove"
        onClick={() =>
          setImages(images.filter((_, i) => i !== index))
        }
      >
        ✕
      </button>

    </div>
  ))}
</div>
        <button type="submit" className="add-prodt-submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default Product;