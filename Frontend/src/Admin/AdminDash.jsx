import React, { useState } from "react";
import Sidebar from "./SideBar";
import AddProduct from "./Product";
import ProductList from "./ShowAll";
import { useNavigate } from "react-router-dom";
import CustomerDetails from "./CustomerDetails";
import Addcategory from "./Addcategory";
import ProductUp from "./Product";
import "./AdminDash.css";
import Orders from "./OrdersPage";
import Query from "./Query"
import DetailDashboard from "./DetailDashboard";
export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const renderPage = () => {
    switch (page) {
      case "Dashboard":
        return <DetailDashboard/>
      case "Add Product":
        return <AddProduct />;
        case "Orders":
        return <Orders />;
      case "Add Category":
        return <Addcategory/>;
      case "Customers":
        return <CustomerDetails />;
      case "Product List":
        return <ProductList />;
         case "Queries":
        return <Query/>;
      case "Logout":
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
        return null;
      default:
        return <DetailDashboard/>;
    }
  };

  const isDashboard = page === "Dashboard"; 

  return (
    <div className="admin-layout">

     
      {isDashboard ? (
        <div className="sidebar-fixed">
          <Sidebar setPage={setPage} active={page} />
        </div>
      ) : (
        <div className="sidebar-fixed">
          <Sidebar setPage={setPage} active={page} />
        </div>
      )}

      {isDashboard && showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div className={`content ${!isDashboard ? "with-sidebar" : ""}`}>
        {renderPage()}
      </div>

    </div>
  );
}