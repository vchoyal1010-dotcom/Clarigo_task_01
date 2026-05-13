import React, { useEffect, useState } from "react";
import api from "../Components/AxiosInterance";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./FavirateProduct.css";
import Carousel from 'react-bootstrap/Carousel';

function FavoriteProduct() {

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token=localStorage.getItem("token");

    if(token){
      const savedFav = localStorage.getItem("favorites");
    if (savedFav) {
    Promise.resolve().then(()=> setFavorites(JSON.parse(savedFav)));
    }
    }
    else{
      navigate("/login")
    }
      }, [navigate]);
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/product/all");

        let data = [];

        if (Array.isArray(res.data)) {
          data = res.data;
        } else if (Array.isArray(res.data.products)) {
          data = res.data.products;
        }

        setProducts(data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const removeFavorite = (id) => {
    const updated = { ...favorites };
    delete updated[id];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const likedProducts = products.filter(
    (item) => favorites[item._id]
  );

  return (
    <div className="Fav-container1">
     <button onClick={()=>{navigate("/")}} className="Fav-back-btn">Back</button>
      <h2 className="Fav-products-title">
        ❤️ Favorite Products
      </h2>

      <div className="Fav-grid">

        {likedProducts.length > 0 ? (

          likedProducts.map((item) => (

            <div className="Fav-card" key={item._id}>

              <div className="fav-icon">
              
              </div>

              
               <Carousel interval={null} indicators={false}>
                <Carousel.Item>
                   <img src={item.images[0]} className="Fav-image" />
                </Carousel.Item>

                <Carousel.Item>
                 <img src={item.images[1]} className="Fav-image" />
                 </Carousel.Item>

                  <Carousel.Item>
                   <img src={item.images[2]} className="Fav-image" />
                  </Carousel.Item>
                    </Carousel>

              <h3 className="Fav-product-name">
                {item.name}
              </h3>

              <p className="Fav-category">
                Category: {item.category}
              </p>

              <p className="Fav-price">
                Price: ₹{item.price}
              </p>

              <div className="Fav-product-buttons">

                <button
                  className="Fav-remove-btn"
                  onClick={() => removeFavorite(item._id)}
                >
                  Remove
                </button>

                <button
                 className="Fav-buy-btn"
                  onClick={() => {
                  const existingCart = JSON.parse(localStorage.getItem("cart")) || {};

                  const updatedCart = {
                    ...existingCart,
                     [item._id]: (existingCart[item._id] || 0) + 1
                     };

                      localStorage.setItem("cart", JSON.stringify(updatedCart));

                    navigate("/cart", { state: { cart: updatedCart } });
                    }}
                >
                  Go to Cart
                </button>

              </div>

            </div>

          ))

        ) : (

          <p className="Fav-no-products">
            No favorite products yet
          </p>

        )}

      </div>

    </div>
  );
}

export default FavoriteProduct;