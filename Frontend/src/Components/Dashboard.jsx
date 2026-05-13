import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Components/AxiosInterance";
import "./Dashboard.css";
import logo from "../assets/logoClarigo.png";
import ShowCategory from "./ShowCategory";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Carousel from 'react-bootstrap/Carousel';
import Carousel1 from "./Carousel1";
import FooterPage from "./FooterPgae";
import { FiUser } from "react-icons/fi";
import UserProfile from "./UserProfile";
import { IoBagHandleSharp } from "react-icons/io5";
function Dashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const totalFavorites = Object.values(favorites).filter(Boolean).length;

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

       const activeProducts = data.filter(item => item.Status);

           setProducts(activeProducts);
           setAllProducts(activeProducts);

      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

const handleBuy = (product) => {
  navigate("/cart", {
    state: { singleProduct: product }
  });
};

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);

    const filtered = allProducts.filter(
      (item) => item.category === cat
    );

    setProducts(filtered);
  };

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product._id]: (prev[product._id] || 0) + 1
    }));
  };


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    setProducts(filteredProducts);

    if (query === "") {
      setProducts(allProducts);
    }
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
const handleUserClick = () => {
  const user = localStorage.getItem("token");

  if (user) {
    setIsProfileOpen(true); 
  } else {
    navigate("/login"); 
  }
};
  return (
    <div className="dash-container1">

      <div className="dash-title-two">

        <img src={logo} alt="Logo" className="dash-logo" />

        <input
          type="text"
          placeholder="Search products..."
          className="dash-search"
          onChange={handleSearch}
        />

                           
 
        <div className="dash-fav-wrapper" onClick={() => navigate("/favorites")}>
          <AiOutlineHeart className="dash-icon" />
          {totalFavorites > 0 && (
            <span className="dash-fav-count">
              {totalFavorites}
            </span>
          )}
        </div>

        <div
          className="dash-cart-wrapper"
          onClick={() => navigate("/cart", { state: { cart } })}
        >
          <BsCart4 className="dash-icon" />
          {totalItems > 0 && (
            <span className="dash-cart-count">
              {totalItems}
            </span>
          )}
        </div>
           <div className="dash-cart-wrapper" >
          <FiUser className="dash-icon" onClick={handleUserClick}/>
        
        </div>
          <UserProfile
           isOpen={isProfileOpen}
             onClose={() => setIsProfileOpen(false)}
          />
           
      </div>

      <div className="clarigo">
        <Carousel1 />
      </div>

      <ShowCategory onCategorySelect={handleCategorySelect} />

      <h2 className="dash-products-title">
        {selectedCategory
          ? `Products in ${selectedCategory}`
          : "Products"}
      </h2>

      <div className="dash-grid">

        {products.length > 0 ? (

          products.map((item) => (

            <div className="dash-card" key={item._id}>

             <div className="image-wrapper">

  <div
    className="fav-icon"
    onClick={() => toggleFavorite(item._id)}
  >
    {favorites[item._id] ? (
      <AiFillHeart color="red" />
    ) : (
      <AiOutlineHeart />
    )}
  </div>

  <Carousel interval={null} indicators={false}>
    <Carousel.Item>
      <img src={item.images[0]} className="dash-image" />
    </Carousel.Item>

    <Carousel.Item>
      <img src={item.images[1]} className="dash-image" />
    </Carousel.Item>

    <Carousel.Item>
      <img src={item.images[2]} className="dash-image" />
    </Carousel.Item>
  </Carousel>

</div>

              <h3 className="dash-product-name">{item.name}</h3>
              <p className="dash-category">Category: {item.category}</p>
              <p className="dash-price">Price: ₹{item.price}</p>
              <p className="dash-stock">Stock: {item.quantity}</p>

              <div className="dash-product-buttons">

                {!cart[item._id] ? (
                  <button
                    className="dash-cart2-btn"
                    onClick={() => addToCart(item)}
                  > <IoBagHandleSharp className="a1234"/>
                    Add to Cart
                  </button>
                ) : (
                  
                    <button onClick={()=>navigate("/cart", { state: { cart } })} className="dash-cart3-btn">
                      Go To Cart
                    </button>
                  
            
                )}

               <button 
                  className="dash-buy-btn" 
                  onClick={() => handleBuy(item)}
                 >
                   Buy
                    </button>

              </div>

            </div>

          ))

        ) : (

          <p>No products available</p>

        )}

      </div>
          <footer>
            <FooterPage/>
          </footer>
    </div>
  );
}

export default Dashboard;