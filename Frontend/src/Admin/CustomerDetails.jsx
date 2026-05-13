import React, { useEffect, useState } from "react";
import api from "../Admin/AdminAuth";
import { FaTrash } from "react-icons/fa";
import "./CustomerDetails.css";

function CustomerDetails() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get("/user/getusers");
        setCustomers(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/delete/${id}`);
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

 const handleStatusToggle = async (id) => {
  const res = await api.put(`/user/status/${id}`);
  const updatedStatus = res.data.Status; 
  setCustomers(
    customers.map((c) =>
      c._id === id ? { ...c, Status: updatedStatus } : c
    )
  );
};

  return (
    <div className="cust-page">
      <h2 className="cust-title">Customers</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="cust-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      
      <div className="cust-table-box">
        <table className="cust-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Spent</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c) => (
                <tr key={c._id}>
                  
                  <td>
                    {c.avatar ? (
                      <img src={c.avatar} alt={c.name} />
                    ) : (
                      <div className="avatar-circle">{c.name[0]}</div>
                    )}
                  </td>

                  <td>{c.name}</td>
                  <td className="email-cell">{c.email}</td>
                  <td>{c.totalOrders || 0}</td>
                  <td>₹{c.totalSpent || 0}</td>

                
                  <td>
                 
                    <button
                    className={`cust-status-btn ${c.Status ? "active" : "inactive"}`}
                       onClick={() => handleStatusToggle(c._id)}
                          > 
                        {c.Status ? "Active" : "Inactive"}
                          </button>
                    
                  </td>

                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>

                  
                  <td>
                    <div className="cust-actions">
                      <FaTrash
                        className="cust-icon delete"
                        onClick={() => handleDelete(c._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="cust-no-data">
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerDetails;