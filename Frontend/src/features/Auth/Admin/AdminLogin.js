import React, { useState } from "react";
import "./AdminLogin.css"; // Make sure to import your CSS file

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here or route to a login function
    console.log("Login logic will go here");
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
                <input type="email" placeholder="Enter your email" required />
                <i className="uil uil-envelope-alt email"></i>
              </div>

              <div className="input_box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
