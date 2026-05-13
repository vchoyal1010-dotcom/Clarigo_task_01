import React, { useEffect, useState } from "react";
import api from "../Admin/AdminAuth";
import "./DetailDashboard.css";

function DetailDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  });

  const [recentProducts, setRecentProducts] = useState([]);

 
  const fetchDashboardData = async () => {
    try {
      const productsRes = await api.get("/product/all");
      const categoriesRes = await api.get("/product/showAll");
      const user=await api.get("/user/getusers");
      const order = await api.get("/orders/all");
      const products = productsRes.data.products;
      const categories = categoriesRes.data.show;
      const users=user.data.user;
      const orders=order.data.order;
      let count=0;
      for(let i=0;i<orders.length;i++){
        count=count+ orders[i].totalAmount;
      }
      
      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalUsers: users.length,
        totalOrders: orders.length,
        revenue: count,
      });

      setRecentProducts(products.slice(-5).reverse());

    } catch (err) {
      console.log(err);
    }
  };
    useEffect(() => {
  Promise.resolve().then(()=>  fetchDashboardData());
  }, []);

  return (
    <div className="adash-container">

      <h2 className="adash-title">Dashboard</h2>

      <div className="adash-stats">

        <div className="adash-card">
          <p>Total Products</p>
          <h3>{stats.totalProducts}</h3>
        </div>

        <div className="adash-card">
          <p>Total Categories</p>
          <h3>{stats.totalCategories}</h3>
        </div>

        <div className="adash-card">
          <p>Total Users</p>
          <h3>{stats.totalUsers}</h3>
        </div>

        <div className="adash-card">
          <p>Total Orders</p>
          <h3>{stats.totalOrders}</h3>
        </div>

        <div className="adash-card">
          <p>Revenue</p>
          <h3>₹{stats.revenue}</h3>
        </div>

      </div>

      <div className="adash-activity">

        <div className="adash-box">
          <h3 className="adash-box-title">Recent Products</h3>

          {recentProducts.length > 0 ? (
            recentProducts.map((item) => (
              <div key={item._id} className="adash-item">
                <img src={item.images[0]} alt="" />
                <div>
                  <p>{item.name}</p>
                  <span>{item.category}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="adash-empty">No recent products</p>
          )}
        </div>

      </div>

    </div>
  );
}

export default DetailDashboard;