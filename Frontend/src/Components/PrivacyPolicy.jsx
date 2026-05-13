import React from "react";
import "./PrivacyPolicy.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="privacy-page-container">

      <div className="privacy-back-icon">
        <FaArrowLeftLong 
          onClick={() => navigate("/")} 
          
        />
      </div>

      <h1 className="privacy-page-title">Privacy Policy</h1>

      <p className="privacy-text">
        Welcome to Shopora. Your privacy is very important to us. This Privacy
        Policy explains how we collect, use, and protect your information.
      </p>

      <h3 className="privacy-heading">1. Information We Collect</h3>
      <p className="privacy-text">
        We may collect personal information such as your name, email address,
        phone number, and delivery address when you use our services.
      </p>

      <h3 className="privacy-heading">2. How We Use Your Information</h3>
      <p className="privacy-text">
        Your information is used to:
      </p>
      <ul className="privacy-list">
        <li>Process your orders</li>
        <li>Improve our services</li>
        <li>Send updates and notifications</li>
      </ul>

      <h3 className="privacy-heading">3. Data Security</h3>
      <p className="privacy-text">
        We take appropriate security measures to protect your personal data from
        unauthorized access or misuse.
      </p>

      <h3 className="privacy-heading">4. Cookies</h3>
      <p className="privacy-text">
        We use cookies to enhance your browsing experience and analyze website
        traffic.
      </p>

      <h3 className="privacy-heading">5. Third-Party Services</h3>
      <p className="privacy-text">
        We may use trusted third-party services (like payment gateways) which
        have their own privacy policies.
      </p>

      <h3 className="privacy-heading">6. Your Rights</h3>
      <p className="privacy-text">
        You have the right to access, update, or delete your personal data at any
        time.
      </p>

      <h3 className="privacy-heading">7. Contact Us</h3>
      <p className="privacy-text">
        If you have any questions, contact us at: support@shopora.com
      </p>

      <p className="privacy-footer-text">
        Last updated: April 2026
      </p>

    </div>
  );
}

export default PrivacyPolicy;