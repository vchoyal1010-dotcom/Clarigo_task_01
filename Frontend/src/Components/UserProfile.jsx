import React, { useState } from "react";
import {
  FiLogOut,
  FiX,
  FiHeart,
  FiShoppingBag,
  FiLock,
  FiHelpCircle
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import UpdateUser from "./UpdateUser";
import "./UserProfile.css";
import api from "./AxiosInterance";
import { useEffect } from "react";
import CustomerSupport from "./CustomerSupport";

const UserProfile = ({ isOpen, onClose }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [image, setImage] = useState("");
  const [isopen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false); 
  
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  
  const fetchImage = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const response = await api.get(
        `/user/imageShow/${userId}`
      );
      const imageUrl = response.data.user;
      setImage(imageUrl);
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []); 

  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("image", file);

      await api.put(
        `/user/updateImage/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchImage();
      

    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`profile-sidebar ${isOpen ? "open" : ""}`}>
        <FiX className="close-icon" onClick={onClose} />

        <div className="avatar-wrapper">
          {image ? (
            <img src={image} alt="avatar" className="avatar" />
          ) : (
            <div className="avatar-placeholder">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            id="uploadProfileImage"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            disabled={uploading}
          />

          <label htmlFor="uploadProfileImage">
            <MdModeEdit className="edit-icon" />
          </label>
        </div>

        <h2 className="name">{name}</h2>
        <p className="email">{email}</p>

        <div className="menu">
          <div className="menu-item" onClick={() => navigate("/favorites")}>
            <FiHeart /> <span>My Wishlist</span>
          </div>

          <div className="menu-item" onClick={() => navigate("/myorders")}>
            <FiShoppingBag /> <span>My Orders</span>
          </div>

          <div className="menu-item" onClick={() => setIsEditOpen(true)}>
            <RiAccountCircleLine /> <span>My Account</span>
          </div>

          <div className="menu-item" onClick={() => navigate("/userforgotpass")}>
            <FiLock /> <span>Change Password</span>
          </div>

          <div className="menu-item" onClick={() => setIsOpen(true)}>
            <FiHelpCircle /> <span>Customer Support</span>
          </div>
        </div>

        <div
          className="menu-item logout-item"
          onClick={() => {
            localStorage.clear();
            onClose();
            navigate("/");
          }}
        >
          <FiLogOut /> <span>Logout</span>
        </div>
      </div>

      <UpdateUser isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <CustomerSupport isOpen={isopen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default UserProfile;