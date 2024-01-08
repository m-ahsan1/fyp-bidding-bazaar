import React, { useState } from "react";
import "./AdminLogin.css"; // Make sure to import your CSS file
import { toast } from "react-toastify"; // Import toast for notifications
import axios from "axios";
import Cookies from "js-cookie"; // Import Cookies
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to validate form
  const validateForm = () => {
    // Email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

    if (!password) {
      toast.error("Password is required", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here or route to a login function
    if (!email || !password) {
      toast.error("Both email and password are required", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!validateForm()) return;
    

    try {
      const response = await axios.post("http://localhost:3001/api/adminauth", {
        email,
        password,
      });
  
      const { token } = response.data;
  
      if (token) {
        console.log("Login successful!"); // Log success message
        Cookies.set("adminToken", token, { expires: 1 });
        navigate('/adminhome', { replace: true });
      } else {
        console.log("Token not received in the response:", response);
        toast.error("Login failed. Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("Error during login:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <a href="/" className="nav_logo">
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="uil uil-envelope-alt email"></i>
              </div>

              <div className="input_box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
