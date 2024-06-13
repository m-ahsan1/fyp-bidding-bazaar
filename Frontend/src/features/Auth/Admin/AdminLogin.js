import React, { useState } from "react";
import apiServerNode from "../../../apiServerNodeConfig";
import "./AdminLogin.css"; // Make sure to import your CSS file
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiServerNode.post("/api/adminauth", {
        email,
        password,
      });

      // Assuming the API returns a token upon successful login
      const token = response.data;

      const expirationTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", expirationTime);
      // console.log("Login successful. Token:", token);

      navigate('/adminhome', { replace: true });

      // Store the token in local storage or state for further use (example: authentication)
      // localStorage.setItem("token", token);
      // You can redirect or perform actions after successful login
      
    } catch (error) {
      // Handle error cases
      console.error("Login error:", error);
      // Handle specific error messages or display to the user
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <a href="#" className="nav_logo">
            BiddingBazzar
          </a>
        </nav>
      </header>

      {/* Home */}
      <section className="home show">
        <div className="form_container">
          {/* Login Form */}
          <div className="form login_form">
            <form onSubmit={handleSubmit}>
              <h2>Admin Login</h2>

              <div className="input_box">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
                <i className="uil uil-envelope-alt email"></i>
              </div>

              <div className="input_box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
                <i
                  className={`uil ${
                    showPassword ? "uil-eye" : "uil-eye-slash"
                  } pw_hide`}
                  onClick={handleTogglePassword}
                ></i>
              </div>

              <button className="button" type="submit">
                Login Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
