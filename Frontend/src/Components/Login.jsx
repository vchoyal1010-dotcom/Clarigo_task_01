import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../Components/AxiosInterance";
import "./Login.css";
import { IoIosArrowBack } from "react-icons/io";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

function Login() {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      
      const userRole = localStorage.getItem("role");
      if (userRole === "admin") {
        navigate("/adminDash");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!identifier || !password) {
      setMessage("Please fill all fields");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (password.length !== 6) {
      setMessage("Password must be 6 characters");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    
    let data;
    if (identifier.includes("@")) {
      data = {
        email: identifier,
        password: password,
        name: "" 
      };
    } else {
      data = {
        name: identifier,
        password: password,
        email: "" 
      };
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/user/logink", data);
      
      
      if (response.data.success && response.data.token) {
        
        
        localStorage.setItem("token", response.data.token);
        
    
        if (response.data.user) {
          localStorage.setItem("userId", response.data.user._id);
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("role", response.data.user.role || response.data.role);
          localStorage.setItem("Status", response.data.user.Status);
        }
        
        setMessage(response.data.message || "Login successful");
        
        
        if (response.data.redirect) {
          navigate(response.data.redirect);
        } else if (response.data.role === "admin" || response.data.user?.role === "admin") {
          navigate("/adminDash");
        } else {
          navigate("/");
        }
        
      } else {
        setMessage(response.data.message || "Login failed");
        setTimeout(() => setMessage(""), 3000);
      }

    } catch (err) {
      console.error("Login error:", err);
      
      if (err.response) {
        if (err.response.status === 400) {
          setMessage(err.response.data.message || "Invalid credentials");
        } else if (err.response.status === 401) {
          setMessage("Unauthorized access");
        } else if (err.response.status === 404) {
          setMessage("User not found");
        } else {
          setMessage(err.response.data.message || "Login failed");
        }
      } else if (err.request) {
        setMessage("Network error. Please check your connection");
      } else {
        setMessage("An unexpected error occurred");
      }
      
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <IoIosArrowBack onClick={() => navigate("/")} style={{cursor: "pointer"}}/>
      <h2 className="login-title">Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input-group">
          <label className="login-label">Name or Email</label>
          <input
            className="login-input"
            type="text"
            placeholder="Enter name or email"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setMessage(""); 
            }}
            disabled={loading}
            required
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">Password</label>
          <div className="password-wrapper">
            <input
              placeholder="Enter password"
              className="login-input"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage("");
              }}
              maxLength="6"
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

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="login-register-text">
        Don't have an account? <Link className="login-register-link" to="/register">Register</Link>
      </p>
      
      <p>
        <Link className="adminlogin-register-link" to="/userforgotpass">Forgot password?</Link>
      </p>
      
      {message && <p className="login-message">{message}</p>}
    </div>
  );
}

export default Login;