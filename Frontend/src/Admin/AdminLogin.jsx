import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import api from "../Admin/AdminAuth";
import "./AdminLogin.css";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
function AdminLogin() {

  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
 const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
   useEffect(() => {
    const admintoken = localStorage.getItem("admintoken");
  
    if (admintoken) {
      navigate("/adminDash");
    }
    }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;

    if (identifier.includes("@")) {
      data = {
        email: identifier,
        password: password
      };
    } else {
      data = {
        name: identifier,
        password: password
      };
    }

    if (!identifier || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await api.post(
        "/admin/logina",
        data
      );
      localStorage.setItem("admintoken",response.data.admintoken);
      alert(response.data.message || "login successful");
      navigate("/adminDash");

    } catch (err) {

      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("login failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div>
       
      
    </div>
    <div className="adminlogin-container">
      <TiArrowBack  className="regadmin-btn" onClick={() => navigate("/")}/>

      <h2 className="adminlogin-title">Admin login</h2>

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
                  <label className="adminlogin-label">Password</label>
                
                  <div className="password-wrapper">
                    <input
                      placeholder="Enter password"
                      className="adminlogin-input"
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

        <button className="adminlogin-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <p className="adminlogin-register-text">
        Don't have an account? <Link className="adminlogin-register-link" to="/adminreg">Register</Link>
      </p>
      <p>
      <Link className="adminlogin-register-link" to="/forgotpass">Forgot password?</Link>
      </p>


    </div>
    </>
  );
}

export default AdminLogin;