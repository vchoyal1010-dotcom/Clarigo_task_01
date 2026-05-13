import React from "react";
import {
  FaBoxOpen,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiFunctionAddFill } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import "./SideBar.css";

export default function Sidebar({ setPage, active, setShowSidebar }) {

  const menu = [
    { name: "Dashboard", icon : <AiFillDashboard/>},
    { name: "Add Category", icon: <RiFunctionAddFill /> },
    { name: "Add Product", icon: <FaBoxOpen /> },
    { name: "Product List", icon: <FaList /> },
    { name: "Orders", icon: <FaShoppingCart /> },
    { name: "Customers", icon: <FaUsers /> },
    { name: "Queries", icon: <FaCog /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ];

  const handleClick = (name) => {
    setPage(name);

    if (setShowSidebar) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Admin</h2>

      {menu.map((item) => (
        <div
          key={item.name}
          className={`sidebar-item ${
            active === item.name ? "active" : ""
          }`}
          onClick={() => handleClick(item.name)}
        >
          <span className="icon">{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ))} 
    </div>
  );
}