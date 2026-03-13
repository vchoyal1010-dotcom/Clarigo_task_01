import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
      try {

        const res = await axios.get("http://localhost:6002/product/all");

        console.log(res.data);

        // agar backend array bhej raha hai
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } 
        // agar backend object bhej raha hai jisme products array hai
        else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();

  }, []);

  return (

    <div style={{ padding: "40px" }}>

      <h1>Dashboard</h1>

      <button onClick={() => navigate("/product")}>
        Add Product
      </button>

      <h2 style={{ marginTop: "30px" }}>Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        {products.length > 0 ? (

          products.map((item) => (

            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >

              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover"
                }}
              />

              <h3>{item.name}</h3>

              <p>Category: {item.categary}</p>

              <p>Price: ₹{item.price}</p>

              <p>Stock: {item.quantity}</p>

            </div>

          ))

        ) : (

          <p>No products available</p>

        )}

      </div>

    </div>

  );
}

export default Dashboard;