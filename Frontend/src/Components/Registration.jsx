import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Components/AxiosInterance";
import "./Registration.css";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const Navigate = useNavigate();

  
  const validateForm = () => {
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }
    if (name.length < 3) {
      setError("Name must be at least 3 characters");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length !== 6) {
      setError("Password must be 6 characters");
      return false;
    }
    if (password !== confirmpass) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    if (!validateForm()) {
      setTimeout(() => setError(""), 1000);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/user/registered", {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password,
        confirmpass: confirmpass
      });

      

      if (response.data.success || response.status === 201) {
        setMessage(response.data.message || "Registration successful");
        
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPass("");
        
        
          Navigate("/login");
      
      } else {
        setError(response.data.message || "Registration failed");
        setTimeout(() => setError(""), 1000);
      }
      
    } catch (err) {
      console.error(err);
      
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.message || "Invalid registration data");
        } else if (err.response.status === 409) {
          setError("User already exists with this email or name");
        } else {
          setError(err.response.data.message || "Registration failed");
        }
      } else if (err.request) {
        setError("Network error. Please check your connection");
      } else {
        setError("Registration failed");
      }
      
      setTimeout(() => setError(""), 1000);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="reg-container">
       
         <IoIosArrowBack onClick={() => Navigate("/")} style={{cursor: "pointer"}}/>
        <h2 className="reg-title">Register</h2>

        {message && (
          <p className="reg-message" style={{color: "green"}}>{message}</p>
        )}
        
        {error && (
          <p className="reg-message" style={{color: "red"}}>{error}</p>
        )}

        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="reg-input-group">
            <label className="reg-label">Name</label>
            <input
              placeholder="Enter name"
              className="reg-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
                setMessage("");
              }}
              disabled={loading}
              required
            />
          </div>

          <div className="reg-input-group">
            <label className="reg-label">Email</label>
            <input
              placeholder="Enter email"
              className="reg-input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setMessage("");
              }}
              disabled={loading}
              required
            />
          </div>

          <div className="reg-input-group">
            <label className="reg-label">Password</label>
            <div className="password-wrapper">
              <input
                placeholder="Enter password"
                className="reg-input"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                  setMessage("");
                }}
                disabled={loading}
                required
              />
              <span
                className="eye-icon"
                onClick={() => !loading && setShowPassword(!showPassword)}
                style={{cursor: loading ? "not-allowed" : "pointer"}}
              >
                {showPassword ? <VscEyeClosed/> : <VscEye/>}
              </span>
            </div>
          </div>

          <div className="reg-input-group">
            <label className="reg-label">Confirm Password</label>
            <div className="password-wrapper">
              <input
                placeholder="Confirm your password"
                className="reg-input"
                type={showConfirm ? "text" : "password"}
                value={confirmpass}
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                  setError("");
                  setMessage("");
                }}
                disabled={loading}
                required
              />
              <span
                className="eye-icon"
                onClick={() => !loading && setShowConfirm(!showConfirm)}
                style={{cursor: loading ? "not-allowed" : "pointer"}}
              >
                {showConfirm ? <VscEyeClosed/> : <VscEye/>}
              </span>
            </div>
          </div>

          <button className="reg-btn" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="reg-login-text">
          Already have an account? <Link className="reg-login-link" to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default Registration;