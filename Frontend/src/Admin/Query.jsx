import React, { useEffect, useState } from "react";
import "./Query.css";
import api from "./AdminAuth";

function Query() {
  const [queries, setQueries] = useState([]);

  const fetchQueries = async () => {
    try {
      const res = await api.get("/customer/getall");
      setQueries(Array.isArray(res.data) ? res.data : res.data.queries);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
   Promise.resolve().then(() => fetchQueries());
  }, []);

  

  return (
    <div className="adminquery-container">
      <h2 className="adminquery-title">Customer Queries</h2>

      {queries.length === 0 ? (
        <p className="adminquery-empty">No queries found</p>
      ) : (
        <div className="adminquery-list">
          {queries.map((q, index) => (
            <div key={index} className="adminquery-card">

              <h3 className="adminquery-name">
             <strong>Name:</strong> {q.firstName} {q.lastName}
              </h3>

              <p className="adminquery-text">
                <strong>Email:</strong> {q.email}
              </p>

              <p className="adminquery-text">
                <strong>Phone:</strong> {q.phoneNumber}
              </p>

              <p className="adminquery-message">
                <strong>Message:</strong> {q.message}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Query;