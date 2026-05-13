import React, { useState, useEffect } from "react";
import api from "./AxiosInterance";
import "./UpdateUser.css";

const UpdateUser = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const res = await api.get(
          `/user/getaddress/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = res.data.user;

        setForm({
          name: user.name || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          street: user.address?.[0]?.street || "",
          city: user.address?.[0]?.city || "",
          state: user.address?.[0]?.state || "",
          pincode: user.address?.[0]?.pincode || "",
          country: user.address?.[0]?.country || "India",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load user data");
      }
    };

    fetchUser();
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await api.put(
        `/user/update/${userId}`,
        {
          name: form.name,
          email: form.email,
          phoneNumber: form.phoneNumber,
          address: [
            {
              street: form.street,
              city: form.city,
              state: form.state,
              pincode: form.pincode,
              country: form.country,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       localStorage.setItem("address",res.data.address)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message || "Profile Updated Successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="update-overlay">
      <div className="update-card">
        <h2 className="update-title">Edit Profile</h2>

        <input
          className="update-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          className="update-input"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          className="update-input"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone"
        />

        <input
          className="update-input"
          name="street"
          value={form.street}
          onChange={handleChange}
          placeholder="Street"
        />

        <input
          className="update-input"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
        />

        <input
          className="update-input"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
        />

        <input
          className="update-input"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="Pincode"
        />

        <input
          className="update-input"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
        />

        <div className="update-btns">
          <button
            className="update-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button className="update-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;