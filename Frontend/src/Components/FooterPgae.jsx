import React from "react";
import "./FooterPage.css";

import { Link } from "react-router-dom";
import { FaGoogle, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
 function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-left">
          <h2 className="footer-logo">Shopora</h2>
          <p className="footer-desc">
            Your one-stop destination for fashion, electronics, and more.
            Discover quality products at the best prices.
          </p>

           <div className="footer-socials">
              <FaGoogle />
              <FaYoutube />
              <FaFacebook />
              <FaInstagram />
            </div>
          <button className="back-to-top"><a href="#">⬆ Back to Top </a></button>
        </div>

        <div className="footer-links">
          <h4>Shop</h4>
          <a href="#">All Products</a>
          <a href="#">New Arrivals</a>
          <a href="#">Best Sellers</a>
          <a href="#">Discount Deals</a>
          <a href="/cart">Cart</a>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <a onClick={()=>navigate("/contactUs")}>Contact Us</a>
          <a onClick={()=>navigate("/faqs")}>FAQs</a>
          <a href="#">Shipping & Returns</a>
          <a href="#">Track Order</a>
          <a onClick={()=>navigate("/privacy")}>Privacy Policy</a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Shopora. All Rights Reserved.
      </div>

    </footer>
  );
}
export default Footer;