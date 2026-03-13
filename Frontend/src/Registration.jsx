import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

function Registration() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:6002/user/registered",
        {
          name:name,
          email:email,
          password:password
        }
      );

      setMessage("Registration successful");

      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      setMessage("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="container">

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>

      </form>
           <p>
  Already have an account? <Link to="/login">Login</Link>
</p>
      <p className="message">{message}</p>

    </div>
  );
}

export default Registration;