import { React, useEffect } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/slices/userSlice";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
    toast.success("Logout Successfully");
    console.log(auth)
  }

  return (
    <div>
      <nav>
        <div id="RealNav">
          <div id="logo-container">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src="/images/logo.png"
                className="w-45 h-20"
              />
            </Link>
          </div>
          <div id="rightnav">
            {user ? (
              <><button
                type="button"
                className="btn btn-outline-info"
                id="search-btn"
              >
                Buy Tokens
              </button>
                &nbsp;&nbsp;</>
            ) : (
              <></>
            )}
            <ul id="navbar-list">
              {user ? (
                <>
                  <li>
                    <Link to="/user-profile" style={{ color: "grey" }}>
                      Profile
                    </Link>
                  </li>
                  <li onClick={handleLogout} style={{ color: "orchid", cursor: "pointer" }}>
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/user-login">Login</Link>
                  </li>
                  <li>
                    <Link to="/user-signup">Signup</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/contact" style={{ color: "orange" }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div id="mobileNav" >
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 id="logo">
              <b>BiddingBazaar</b>
            </h1>
          </Link>
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
          <div className="offcanvas-header" style={{ color: "black" }}>
            <h5 className="offcanvas-title" id="offcanvasRightLabel">Menu</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >X</button>
          </div>
          <div className="offcanvas-body" style={{ padding: "20px" }}>
            <p><button
              type="button"
              className="btn btn-outline-info"
              id="search-btn"
            >
              Buy Tokens
            </button></p><br></br>
            {user && (
              <>
                <hr />
                <p><Link to="/user-profile" style={{ color: "grey" }}>
                  Profile
                </Link>
                </p>
              </>
            )}
            <hr />
            {user && (
              <p onClick={handleLogout} style={{ cursor: "pointer", color: "orchid", textDecoration: "underline" }}>
                Logout
              </p>
            )}
            {!user && (<>
              <p><Link to="/user-login">
                Login
              </Link></p>
              <hr />
              <p><Link to="/user-signup">
                Signup
              </Link></p>
            </>)}
            <hr />
            <p >
              <Link to="/contact" style={{ color: "orange" }}>
                Contact
              </Link>
            </p>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
