import React, { useState } from 'react';
import './FAQ.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
const faqData = [
  {
    question: "Why are there different prices for the same product? Is it legal?",
    answer: "Different sellers may offer the same product at different prices based on discounts, stock, and seller policies. Yes, it is legal."
  },
  {
    question: "How can I contact any seller?",
    answer: "You can contact the seller through the product page or customer support options provided on the website."
  },
  {
    question: "Why price changes after clicking product?",
    answer: "Prices may vary depending on size, variant, or seller. The final price is shown on the product details page."
  },
  {
    question: "How will I detect fraudulent emails/calls?",
    answer: "Never share OTP, password, or personal details."
  },
  {
    question: "How will I identify a genuine appointment letter?",
    answer: "Verify from official website/email domain."
  },
  {
    question: "Why is 'My Cashback' not available?",
    answer: "Cashback depends on offers and eligibility."
  },
  {
    question: "How do I cancel the order?",
    answer: "Go to your orders → select order → cancel."
  },
  {
    question: "How do I create a Return Request?",
    answer: "Go to orders → select product → return."
  },
  {
    question: "When will product be picked up after return?",
    answer: "Usually within 2–5 days."
  },
  {
    question: "When will I get refund?",
    answer: "Refund takes 5–7 days after pickup."
  },
  {
    question: "Where should I self-ship returns?",
    answer: "Address shown during return process."
  },
  {
    question: "How to redeem Shopora Points?",
    answer: "Use points during checkout."
  }
];

function FAQ() {
    const navigate=useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
       <FaArrowLeftLong onClick={()=>navigate("/")}/>
      <h2 className="faq-title">Frequently Asked Questions</h2>

      {faqData.map((item, index) => (
        <div key={index} className="faq-item">

          <div
            className="faq-question"
            onClick={() => toggle(index)}
          >
            {item.question}
            <span className="faq-icon">
              {openIndex === index ? "-" : "+"}
            </span>
          </div>

          {openIndex === index && (
            <div className="faq-answer">
              {item.answer}
            </div>
          )}

        </div>
      ))}
    </div>
  );
}

export default FAQ;