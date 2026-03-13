import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {

  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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
      setMessage("Please fill all fields");
      return;
    }

    try {

      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:6002/user/logink",
        data
      );

      setMessage(response.data.message || "Login successful");
      navigate("/dashboard");

    } catch (err) {

      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Login failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label>Name or Email</label>
          <input
            type="text"
            placeholder="Enter name or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
<p>
  Don't have an account? <Link to="/">Register</Link>
</p>
      {message && <p className="message">{message}</p>}

    </div>
  );
}

export default Login;