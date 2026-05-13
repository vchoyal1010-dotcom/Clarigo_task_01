import React, { useState } from "react";
import "./CustomerSupport.css";
import image from "../assets/Contact us-pana.png"
import api from "./AxiosInterance";
const CustomerSupport = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhone] = useState("");
  const [message, setProblem] = useState("");
 
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!phoneNumber || !message) {
      alert("Please enter phone number and Problem");
      return;
    }

   api.post(`/customer/query`,{
    phoneNumber:phoneNumber,
    message:message, 
    firstName:null,
    lastName:null,
    email:null

     },
     {
    headers: {
        "Content-Type": "application/json"
      }
  })
     
       alert("Support request sent!");
       setPhone("");
       setProblem("");
     
    
    
  };

  return (
    <div className="support-overlay">
      <div className="support-box">

        <button className="close-btn" onClick={onClose}>×</button>

        <div className="support-content">
          <p className="tag">LEAVE YOUR NUMBER</p>
          <h2>Get free support</h2>
          <p className="desc">
            Leave your number and get detailed information about our products.
          </p>

          <input
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
          />
           <input
            type="text"
            placeholder="Enter your problem"
            value={message}
            onChange={(e) => setProblem(e.target.value)}
          />
          <button className="submit-btn" onClick={handleSubmit}>
            YES, I WANT SUPPORT
          </button>
        </div>

        <div className="support-image">
          <img
            src={image}
            alt="support"
          />
        </div>

      </div>
    </div>
  );
};

export default CustomerSupport;