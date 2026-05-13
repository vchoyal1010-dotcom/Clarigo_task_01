import React, { useEffect, useState } from "react";
import api from "../Admin/AdminAuth";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import "./ShowAll.css";
import ProductUpdate from "./ProductUpdate"; 

function ShowAllProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); 

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/all");
      setProducts(Array.isArray(res.data) ? res.data : res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
 useEffect(() => {
   Promise.resolve().then(() =>  fetchProducts());
  }, []);
  const handleDelete = async (id) => {
    try {
      await api.delete(`/product/delete/${id}`);
      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusToggle = async (id) => {
    const res = await api.put(`/product/status/${id}`);
    const updatedStatus = res.data.Status;

    setProducts(
      products.map((c) =>
        c._id === id ? { ...c, Status: updatedStatus } : c
      )
    );
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sap-page">


      {selectedProduct ? (
        <ProductUpdate
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          refreshProducts={fetchProducts}
        />
      ) : (
        
        <div className="sap-table-box">
      <h2 className="sap-title">Products</h2>
          
          <div className="sap-search-box">
            <input
              type="text"
              placeholder="Search product..."
              className="sap-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="sap-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((item) => (
                <tr key={item._id}>

                  <td>
                    <div className="sap-product-cell">
                      <img src={item.images[0]} alt="" />
                      <span>{item.name}</span>
                    </div>
                  </td>

                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>

                  <td>
                    <button
                      className={`cust-status-btn ${item.Status ? "active" : "inactive"}`}
                      onClick={() => handleStatusToggle(item._id)}
                    >
                      {item.Status ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td>
                    <div className="sap-actions">
                      <LuPencil
                        className="sap-icon sap-edit"
                        onClick={() => handleUpdate(item)}
                      />
                      <RiDeleteBin5Fill
                        className="sap-icon sap-delete"
                        onClick={() => handleDelete(item._id)}
                      />
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}

export default ShowAllProducts;