import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../Components/AxiosInterance";
import "./Login.css";
import { IoIosArrowBack } from "react-icons/io";

import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
function Login() {

  const [identifier, setIdentifier] = useState(""); 
  const [newpassword, setNewPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
 const [showConfirm, setShowConfirm] = useState(false);
 
 const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;

    if (identifier.includes("@")) {
      data = {
        email: identifier,
        newpassword: newpassword,
        confirmpass:confirmpass
      };
    } else {
      data = {
        name: identifier,
        newpassword: newpassword,
        confirmpass:confirmpass


      };
    }

    if (!identifier || !newpassword || !confirmpass) {
      alert("Please fill all fields");
      return;
    }

    try {


      const response = await api.post(
        "/user/forgotpass",
        data
      );

      alert(response.data.message || "Password updated successful");
      navigate("/login");

    } catch (err) {

      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("password updation failed");
      }

    } 
  };

  return (
    <div className="login-container">
       <div>
           <IoIosArrowBack  className="regadmin-btn" onClick={() => navigate("/login")}/>
           
           </div>
      <h2 className="login-title">Forgot Password</h2>

      <form className="login-form" onSubmit={handleSubmit}>

        <div className="login-input-group">
          <label className="login-label">Name or Email</label>
          <input
            className="login-input"
            type="text"
            placeholder="Enter name or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

         <div className="login-input-group">
          <label className="login-label">newPassword</label>
        
          <div className="password-wrapper">
            <input
              placeholder="Enter password"
              className="login-input"
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

          <div className="login-input-group">
          <label className="login-label"> Confirm Password</label>
        
          <div className="password-wrapper">
            <input
              placeholder="Confirm password"
              className="login-input"
              type={showPassword ? "text" : "password"}
              value={confirmpass}
              autoComplete="current-password"
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
        
            <span
              className="eye-icon"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <VscEyeClosed/> : <VscEye/>}
            </span>
          </div>
        </div>
        

        <button className="login-btn" type="submit" >
          Forgot Password
        </button>

      </form>

     
    </div>
  );
}

export default Login;