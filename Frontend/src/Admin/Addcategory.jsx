import React, { useState, useEffect } from "react";
import api from "../Admin/AdminAuth";
import { RiDeleteBin5Fill } from "react-icons/ri";

import "./Addcategory.css";

function Addcategory() {

  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(""); 

  const fetchCategories = async () => {
    try {
      const res = await api.get("/product/showAll");
      setCategories(Array.isArray(res.data.show) ? res.data.show : []);
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
  Promise.resolve().then(() => fetchCategories());
}, []);

  const handleaddCategory = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("image", image);

      await api.post("/product/addCategory", formData);

      alert("Category Added Successfully");
      setCategory("");
      setImage(null);

      fetchCategories(); 

    } catch (err) {
      console.log(err);
    }
  };


  const filteredCategories = categories.filter((item) =>
    item.category.toLowerCase().includes(search.toLowerCase())
  );

   const handledelete=async(id)=>{
    try{
      await api.delete(`/product/deletecat/${id}`);
      setCategories(categories.filter((item)=>item._id!==id));
    }
    catch(err){
      console.log(err);
    }
   }
  return (
    <div className="cat-container1">
       
     

      <h2 className="cat-title"> Add Category</h2>

      <form className="cat-form" onSubmit={handleaddCategory}>
        <input
          type="text"
          placeholder="Category name"
          className="cat-input"
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="cat-input-file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
            <div className="addcat-previewcontainer">
  {image && (
    <div className="addcat-previewbox">

      <img
        src={URL.createObjectURL(image)}
        alt="preview"
        className="addcat-previewimg"
      />

      <button
        type="button"
        className="addcat-previewremove"
        onClick={() => setImage(null)}
      >
        ✕
      </button>

    </div>
  )}
</div>
        <button type="submit" className="cat-submit-btn">
          Add Category
        </button>
      </form>

    
      
      <div className="cat-table-box">
           <div className="cat-search-box">
        <input
          type="text"
          placeholder="Search category..."
          className="cat-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
        <table className="cat-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item, index) => (
                <tr key={index}>
                  
                  <td>
                    <div className="cat-cell">
                      <img src={item.image} alt="" />
                      <span>{item.category}</span>
                    </div>
                  </td>

                  <td className="cat-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                <td><RiDeleteBin5Fill onClick={()=>handledelete(item._id)} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="cat-no-data">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Addcategory;