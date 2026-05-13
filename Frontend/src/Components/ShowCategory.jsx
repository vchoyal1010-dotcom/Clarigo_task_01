import React, { useEffect, useState } from "react";
import api from "../Components/AxiosInterance";
import "./ShowCategory.css"
function ShowCategory({ onCategorySelect }) {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/product/showAll");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.show;

        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="sc-container">

      <h2 className="sc-products-title">Categories</h2>

      <div className="sc-grid">

        {category.length > 0 ? (

          category.map((item) => (

            <div
              className="sc-card"
              key={item._id}
              onClick={() => onCategorySelect(item.category)}
              style={{ cursor: "pointer" }}
            >

              <img
                src={item.image}
                alt={item.name}
                className="sc-image"
              />

              <h3 className="sc-product-name">{item.category}</h3>

            </div>

          ))

        ) : (

          <p className="sc-no-products">No products available</p>

        )}

      </div>

    </div>
  );
}

export default ShowCategory;