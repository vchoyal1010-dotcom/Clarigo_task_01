import React, { useEffect, useState } from "react";
import api from "../Admin/AdminAuth";
import "./OrdersPage.css";

function ShowAllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/all");

        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else if (Array.isArray(res.data.order)) {
          setOrders(res.data.order);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

 

  return (
    <div className="sao-page">

      <h2 className="sao-title">Orders</h2>
      
      <div className="sao-table-box">
        <table className="sao-table">

          <thead>
            <tr>
              <th>Product ID</th>
              <th>Customer</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
             
            </tr>
          </thead>

         <tbody>
  {orders.length > 0 ? (
    orders.map((order) => (
      <tr key={order._id}>

        {/* Product list ek hi cell me */}
        <td className="sao-email-cell2">
          {order.orders.map((item, index) => (
            <div key={index}>
              {item.productId} (x{item.quantity})
            </div>
          ))}
        </td>

        <td>{order.customerName}</td>
        <td>
          {order.orders.reduce((sum, item) => sum + item.quantity, 0)}
        </td>
        <td>₹{order.totalAmount}</td>
        <td>{order.createdAt.slice(0,10)}</td>
        <td>{order.status}</td>
        <td>{order.paymentStatus}</td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="sao-no-data">
        No Orders Found
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default ShowAllOrders;