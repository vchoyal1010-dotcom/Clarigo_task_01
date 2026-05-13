import React, { useState } from "react";
import api from "../Admin/AdminAuth";
import {useNavigate} from "react-router-dom";   
import "./ProductUpdate.css"; 

function DeleteProductByName() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate(); 
  const handleDelete = async () => {
    if (!name) {
      setMessage("Enter the product name to delete");
      return;
    }

    try {
      const res = await api.delete(`/product/delete/${name}`);
      setMessage(res.data.message || `Product '${name}' deleted successfully`);
      setTimeout(()=>{
        setMessage("");
      },1000)

      setName("")
    } catch (err) {
      console.log(err);
      setMessage("Delete failed");
      setName("");
      setTimeout(()=>{
        setMessage("");
      },1000)
    }
  };

  return (
    <div className="prod-update-container">
        <button
        className="prod-update-back-btn"
        onClick={() => navigate("/adminDash")}
      >
        Back
      </button>

      <h2 className="prod-update-title">Delete Product </h2>

      {message && <p className="prod-update-message">{message}</p>}

      <input
        className="prod-update-input"
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="prod-update-submit-btn"
        onClick={handleDelete}
        style={{ marginTop: "15px" }}
      >
        Delete Product
      </button>
    </div>
  );
}

export default DeleteProductByName;