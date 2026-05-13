import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import api from "../Admin/AdminAuth";
import "./Adminlogin.css";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
function AdminForgotPass() {

  const [identifier, setIdentifier] = useState(""); 
  const [newpassword, setNewPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;

    if (identifier.includes("@")) {
      data = {
        email: identifier,
        newpassword: newpassword
      };
    } else {
      data = {
        name: identifier,
        newpassword: newpassword
      };
    }

    if (!identifier || !newpassword) {
      alert("Please fill all fields");
      return;
    }

    try {


      const response = await api.post(
        "/admin/forgotpass",
        data
      );

      alert(response.data.message || "password updated successful");
      navigate("/adminlogin");

    } catch (err) {

      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("password updation failed");
      }

    } 
  };

  return (
    <>
   
    <div className="adminlogin-container">
  <div>
          <TiArrowBack  className="regadmin-btn" onClick={() => navigate("/")}/>
    
    </div>
      <h2 className="adminlogin-title">Admin forgot password</h2>

      <form className="adminlogin-form" onSubmit={handleSubmit}>

        <div className="adminlogin-input-group">
          <label className="adminlogin-label">Name or Email</label>
          <input
            className="adminlogin-input"
            type="text"
            placeholder="Enter name or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

          <div className="adminlogin-input-group">
                            <label className="adminlogin-label">newPassword</label>
                          
                            <div className="password-wrapper">
                              <input
                                placeholder="Enter password"
                                className="adminlogin-input"
                                type={showPassword ? "text" : "password"}
                                value={newpassword}
                                autoComplete="current-password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                              />
                          
                              <span
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <VscEyeClosed/> : <VscEye/>}
                              </span>
                            </div>
                          </div>
        <button className="adminlogin-btn" type="submit" >
          Forgot password
        </button>

      </form>

     
    </div>
    </>
  );
}

export default AdminForgotPass;