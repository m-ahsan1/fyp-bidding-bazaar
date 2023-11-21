import { React, useState } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import UserSign from "../features/Auth/User/UserSignup/UserSignup";
import UserLogin from "../features/Auth/User/UserLogin/UserLogin";

const Navbar = () => {
  const [isUserSignOpen, setIsUserSign] = useState(false);
  const [isUserLoginOpen, setIsUserLogin] = useState(false);
  const OpenSignup = () => {
    setIsUserSign(true);
  };

  const CloseSignup = () => {
    setIsUserSign(false);
  };

  const OpenLogin = () => {
    setIsUserLogin(true);
  };

  const CloseLogin = () => {
    setIsUserLogin(false);
  };

  return (
    <div>
      <nav>
        <div id="RealNav">
          <div id="logo-container">
            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              <h1 id="logo">
                <b>BiddingBazaar</b>
              </h1>
            </Link>
          </div>
          <div id="rightnav">
            <button
              type="button"
              className="btn btn-outline-info"
              id="search-btn"
            >
              🔍 Search &#9660;
            </button>
            &nbsp;&nbsp;
            <ul id="navbar-list">
              <li>
                <a href="#">HOW IT WORKS</a>
              </li>
              <li>│</li>
              <li>
                <button onClick={OpenLogin}>Log In</button>
              </li>
              <li>
                <button onClick={OpenSignup}>Signup</button>
              </li>
              <li>
                <Link to="/contact" style={{ color: "orange" }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div id="mobileNav" style={{ backgroundColor: "#f9f9f9" }}>
          <h1 id="logo">BiddingBazaar</h1>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            id="MobileNabBarButton"
          >
            ☰
          </button>
        </div>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel"></h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body" style={{ padding: "20px" }}>
            <p>🔍 Search</p>
            <hr />
            <p>HOW It WORKS</p>
            <hr />
            <p>LOG IN</p>
            <hr />
            <p>SIGN UP</p>
            <hr />
            <p style={{ color: "orange" }}>FREELANCER?</p>
          </div>
        </div>
      </nav>
      {isUserSignOpen && (
        <div>
          <UserSign onClose={CloseSignup} />
        </div>
      )}
      {isUserLoginOpen && (
        <div>
          <UserLogin onClose={CloseLogin} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
