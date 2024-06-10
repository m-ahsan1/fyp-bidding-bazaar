import React, { useState,useEffect } from "react";
import axios from "axios";
import AdminNavigation from "./AdminNavigation";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [adminData, setAdminData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token exists, redirect to /admin
      navigate('/admin', { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assuming the admin is authenticated and token is stored in localStorage
      const response = await axios.post("http://localhost:3001/api/admin", adminData, {
        headers: {
          'x-auth-token': token
        }
      });
      setMessage("Admin created successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating admin");
    }
  };

  return (
    <>
      <AdminNavigation />
      <div className="container mt-5">
        <div className="card">
          <div className="card-header text-center">
            <h2>Add New Admin</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={adminData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={adminData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={adminData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Add Admin
              </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
