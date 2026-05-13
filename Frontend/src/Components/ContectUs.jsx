import React, { useState } from "react";
import "./ContectUs.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"
import api from "./AxiosInterance";
function ContactUs() {
    const navigate=useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const res = await api.post("/customer/query", form
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="contactus-container">
     
      {/* LEFT SIDE */}
      <div className="contactus-left">
         <FaArrowLeftLong className="contactus-arrow"
          onClick={() => navigate("/")} 
          
        />
        <h2 className="contactus-title">Contact Us</h2>
        <p className="contactus-subtitle">
          Any question? We would be happy to help you!
        </p>

        <div className="contactus-info">📞 +0123456789</div>
        <div className="contactus-info contactus-highlight">
          ✉ shopora@email.com
        </div>
        <div className="contactus-info">📍 123 vijay nagar Rd.</div>
      </div>

      {/* RIGHT SIDE */}
      <form className="contactus-form" onSubmit={handleSubmit}>
        
       <div className="contactus-row">

  <div className="contactus-field">
    <label className="contactus-label">First Name</label>
    <input
      className="contactus-input"
      name="firstName"
      placeholder="Enter first name"
      onChange={handleChange}
      required
    />
  </div>

  <div className="contactus-field">
    <label className="contactus-label">Last Name</label>
    <input
      className="contactus-input"
      name="lastName"
      placeholder="Enter last name"
      onChange={handleChange}
      required
    />
  </div>

</div>

<div className="contactus-field">
  <label className="contactus-label">Email</label>
  <input
    className="contactus-input"
    name="email"
    placeholder="Enter email"
    onChange={handleChange}
    required
  />
</div>

<div className="contactus-field">
  <label className="contactus-label">Phone Number</label>
  <input
    className="contactus-input"
    name="phoneNumber"
    placeholder="Enter phone number"
    onChange={handleChange}
  />
</div>

<div className="contactus-field">
  <label className="contactus-label">Message</label>
  <textarea
    className="contactus-textarea"
    name="message"
    placeholder="Write your message..."
    onChange={handleChange}
    required
  />
</div>

        <button className="contactus-button" type="submit">
          Send Message
        </button>

      </form>

    </div>
  );
}

export default ContactUs;