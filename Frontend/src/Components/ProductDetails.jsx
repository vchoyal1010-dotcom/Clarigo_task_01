import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../Components/AxiosInterance";
import "./ProductDetails.css";
import Carousel from 'react-bootstrap/Carousel';

function ProductDetails() {
  const location = useLocation();
  const initialCart = location.state?.cart || {};
  const singleProduct = location.state?.singleProduct;
  const [cart, setCart] = useState(initialCart);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log(userId);

        const res = await api.get(`/user/getstatus/${userId}`);
        const user = res.data.user;

        if (user && user.Status !== undefined) {
          localStorage.setItem("Status", JSON.stringify(user.Status));
        }

      } catch (error) {
        console.log(error.message);
      }
    };

    checkUserStatus();
  }, []);

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
        const filtered = data.filter((item) => cart[item._id]);
        setCartProducts(filtered);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [cart]);

  const increaseQty = (item) => {
    setCart((prev) => ({
      ...prev,
      [item._id]: prev[item._id] + 1
    }));
  };

  const decreaseQty = (item) => {
    const currentQty = cart[item._id];

    const newCart = {
      ...cart,
      [item._id]: currentQty - 1
    };

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem1 = (item) => {
    const newCart = { ...cart };
    delete newCart[item._id];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalItems = singleProduct 
    ? 1 
    : Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const totalPrice = singleProduct
    ? singleProduct.price
    : cartProducts.reduce((sum, item) => {
        return sum + item.price * cart[item._id];
      }, 0);

  const handleBuyAll = async () => {
    const token=localStorage.getItem("token");
    if(token){

    
    const Status = JSON.parse(localStorage.getItem("Status"));

    
    if (Status === false) {
      return alert("Your account is blocked. Please contact support.");
    }
  if (totalItems === 0) {
      return alert("atleast one product add to your cart");
    }

    const address=localStorage.getItem("address");
    if(!address || address==[]){
      alert("First add your Address !!")
      return
      
    }

    try {
      const userId = localStorage.getItem("userId");
      const name = localStorage.getItem("name");
      
      const totalOrders = singleProduct
        ? [{
            productId: singleProduct._id,
            productName: singleProduct.name,
            quantity: 1,
            price: singleProduct.price,
            images: singleProduct.images
          }]
        : cartProducts.map((item) => ({
            productId: item._id,
            productName: item.name,
            quantity: cart[item._id],
            price: item.price,
            images: item.images
          }));

      alert(`You bought ${totalItems} items for ₹${totalPrice}`);

      await api.post("/user/stocks", {
        userId,
        totalOrders,
        totalSpent: totalPrice,
      });

      const formData = new FormData();

      formData.append("customerName", name);
      formData.append("userId", userId);
      formData.append("totalAmount", totalPrice);

      
      totalOrders.forEach((order, index) => {
        formData.append(`orders[${index}][productId]`, order.productId);
        formData.append(`orders[${index}][productName]`, order.productName);
        formData.append(`orders[${index}][quantity]`, order.quantity);
        formData.append(`orders[${index}][price]`, order.price);
        formData.append(`orders[${index}][images]`, JSON.stringify(order.images || []));
      });

      await api.post("/orders/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // console.log("Order saved");
      
      setCart({});
      localStorage.removeItem("cart");
      navigate("/");

    } catch (error) {
      console.log("ORDER ERROR:", error);
      console.log("RESPONSE:", error.response);
      alert(error.response?.data?.message || "Something went wrong");
    }
    }
   else{
    navigate("/login")
    }
 }
   
  return (
    <div className="pd-container">
      <div className="cart-items-wrapper">
        <h2 className="pd-title">YOUR CART</h2>

        {singleProduct ? (
          <div className="pd-card">
            <Carousel interval={null} indicators={false}>
              {singleProduct.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img src={img} alt={singleProduct.name} className="pd-image" />
                </Carousel.Item>
              ))}
            </Carousel>

            <div className="pd-info">
              <div>
                <h3 className="pd-name">{singleProduct.name}</h3>
                <p className="pd-text">Category : {singleProduct.category}</p>
                <p className="pd-text">Price: ₹{singleProduct.price}</p>
              </div>
            </div>
          </div>
        ) : cartProducts.length > 0 ? (
          cartProducts.map((item) => (
            <div className="pd-card" key={item._id}>
              <Carousel interval={null} indicators={false}>
                {item.images && item.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img src={img} alt={item.name} className="pd-image" />
                  </Carousel.Item>  
                ))}
              </Carousel>

              <div className="pd-info">
                <div>
                  <h3 className="pd-name">{item.name}</h3>
                  <p className="pd-text">Category : {item.category}</p>
                  <p className="pd-text">Price: ₹{item.price}</p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <span>{cart[item._id]}</span>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>
              </div>

              <div>
                <button onClick={() => removeItem1(item)} className="quantity-controls123">
                  remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="pd-empty">No items in cart</p>
        )}
      </div>

      <div className="pd-summary">
        <h3>Order Summary</h3>
        
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>
        
        <div className="summary-row">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="summary-row">
          <span>Delivery Fee</span>
          <span>₹0</span>
        </div>

        <div className="summary-row summary-total">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <button className="pd-buy-btn" onClick={handleBuyAll}>
          Go to Checkout →
        </button>
        
        <button 
          onClick={() => navigate("/")} 
          className="pd-buy-btn" 
          style={{backgroundColor: '#666', marginTop: '10px'}}
        >
          Back to Shop
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;