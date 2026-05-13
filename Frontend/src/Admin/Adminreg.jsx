import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Admin/AdminAuth";
import "./Adminreg.css";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
function Adminreg() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

   await api.post(
        "/admin/register",
        {
          name: name,
          email: email,
          password: password,
          confirmpass:confirmpass
        }
      );

      alert("registration successful");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPass("");
          Navigate("/adminlogin");
    } catch (err) {
      alert("registration failed");
      console.error(err);
    }
  };

  return (
    <div className="admin-container">

      <h2 className="admin-title"> Admin Registration</h2>

      <form className="admin-form" onSubmit={handleSubmit}>

        <div className="admin-input-group">
          <label className="admin-label">Name</label>
          <input placeholder="Enter name"
            className="admin-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="admin-input-group">
          <label className="admin-label">Email</label>
          <input placeholder="Enter email"
            className="admin-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

               <div className="admin-input-group">
          <label className="admin-label">Password</label>
        
          <div className="password-wrapper">
            <input
              placeholder="Enter password"
              className="admin-input"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
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
        
               <div className="admin-input-group">
          <label className="admin-label"> Confirm Password</label>
        
          <div className="password-wrapper">
            <input
              placeholder="Confirm your password"
              className="admin-input"
              type={showConfirm ? "text" : "password"}
              value={confirmpass}
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
        
        <button className="admin-btn" type="submit">
          Registration
        </button>

      </form>

      <p className="admin-login-text">
        Already have an account? <Link className="admin-login-link" to="/adminlogin">Login</Link>
      </p>


    </div>
  );
}

export default Adminreg;