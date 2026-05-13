import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";
import api from "./AxiosInterance";
import Carousel from "react-bootstrap/Carousel";
import { FaArrowLeft } from "react-icons/fa6";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await api.get(
          `/orders/userorders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        }
      } catch (err) {
        setErrorState(err.response?.data?.message || err.message);
      } finally {
        setLoadingState(false);
      }
    };

    fetchOrders();
  }, [token]);

  const parseImages = (images) => {
    if (!images) return [];
    
    if (Array.isArray(images) && images.length === 1 && typeof images[0] === 'string') {
      try {
        const parsed = JSON.parse(images[0]);
        return Array.isArray(parsed) ? parsed : [];
      } catch(e) {
        console.log(e)
        return [];
      }
    }
    
    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed : [];
      } catch(e) {
        console.log(e)
        return [];
      }
    }
    
    if (Array.isArray(images)) {
      return images;
    }
    
    return [];
  };

  if (loadingState) return <p className="myo_loadingText">Loading orders...</p>;
  if (errorState) return <p className="myo_errorText">Error: {errorState}</p>;

  return (
    <div className="myo_mainWrapper">
      <h2 className="myo_pageTitle">
        <FaArrowLeft onClick={() => navigate("/")} /> My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="myo_emptyText">No orders found.</p>
      ) : (
        <div className="myo_orderList">
          {orders.map((order) => (
            <div key={order._id} className="myo_orderCard">
              <div className="myo_cardHeader">
                <span className="myo_orderId">Order #{order._id}</span>
                <button className="myo_trackBtn">Track Order</button>
              </div>

              {order.orders?.map((item, index) => {
                const itemImages = parseImages(item.images);
                
                return (
                  <div key={index}>
                    <div className="myo_contentRow">
                      {itemImages.length > 0 ? (
                        <Carousel interval={null} indicators={false}>
                          {itemImages.map((img, imgIdx) => (
                            <Carousel.Item key={imgIdx}>
                              <img 
                                src={img} 
                                alt="product" 
                                className="myo_productImg"
                              />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      ) : (
                        <img
                          src="https://via.placeholder.com/300x200?text=No+Image"
                          alt="No Image"
                          className="myo_productImg"
                        />
                      )}

                      <div className="myo_itemDetails">
                        <h4 className="myo_productName">
                          {item.productName || "Product Name"}
                        </h4>
                        <p className="myo_productMeta">
                          Qty: {item.quantity}
                        </p>
                        <p className="myo_productPrice">
                          ₹{item.price || 0}
                        </p>
                      </div>
                    </div>

                    <div className="myo_cardFooter">
                      <div>
                        <span className="myo_statusLabel">Status:</span>
                        <span className="myo_statusValue">{order.status || "In-Transit"}</span>
                      </div>
                      <div className="myo_deliveryText">
                        Ordered: {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="myo_totalAmount">
                Total: ₹{order.totalAmount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;