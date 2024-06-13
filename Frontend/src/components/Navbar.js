import { React, useEffect } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, updateUserToken } from "../redux/slices/userSlice";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckout from "react-stripe-checkout";

const Navbar = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
    toast.success("Logout Successfully", {
      position: toast.POSITION.TOP_CENTER,
  });
    console.log(auth);
  };

  const publishableKey =
    "pk_test_51OJKAXLYINFqcfoRE0wdt2axn9TVcPLJMeGZzmFBavqw5c8x2xTSRqxnVsjuGMWZIWDsYT6M4MB7eW8bUPFRNy2Z00u3wQxOhi";
  const payNow = async (token, price) => {
    console.log("Payment was successful!", auth.currentUser.uid);
    dispatch(
      updateUserToken({ uid: auth.currentUser.uid, addTokenAmount: 500 })
    );
    try {
      // Fetch the payment processing endpoint
      const response = await fetch("http://localhost:3001/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Correct header for JSON data
        },
        body: JSON.stringify({
          amount: price,
          token: token.id, // Token must include only the ID
        }),
      });

      // Check the response status
      if (response.ok) {
        const data = await response.json();
        console.log("Payment was successful!", data, auth.currentUser.token);
      } else {
        // Extract and log the error message from the response
        const errorData = await response.json();
        throw new Error(errorData.message || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error.message);
    }
  };

  return (
    <div>
      <nav>
        <div id="RealNav">
          <div id="logo-container">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src="/images/logo.png" className="w-45 h-20" />
            </Link>
          </div>
          <div id="rightnav">
            {user ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  id="search-btn"
                >
                  <StripeCheckout
                    stripeKey={publishableKey}
                    label="Buy Token"
                    name="Pay with Credit Card"
                    billingAddress
                    shippingAddress
                    amount={5000}
                    description={"Your total is "}
                    token={payNow}
                  /> <strong>Token:</strong> {user?.token || 0}{" "}
                </button>
                &nbsp;&nbsp;
              </>
            ) : (
              <></>
            )}
            <ul id="navbar-list">
              <li>
                <Link to="/" style={{ color: "purple" }}>
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/profile" style={{ color: "grey" }}>
                      Profile
                    </Link>
                  </li>
                  <li
                    onClick={handleLogout}
                    style={{ color: "orchid", cursor: "pointer" }}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
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

        <div id="mobileNav">
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
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div className="offcanvas-body" style={{ padding: "20px" }}>
            <p>
              <button
                type="button"
                className="btn btn-outline-info"
                id="search-btn"
              ></button>
            </p>

            <br></br>
            <>
              <hr />
              <p>
                <Link to="/" style={{ color: "purple" }}>
                  Home
                </Link>
              </p>
            </>
            {user && (
              <>
                <hr />
                <p>
                  <Link to="/profile" style={{ color: "grey" }}>
                    Profile
                  </Link>
                </p>
              </>
            )}
            <hr />
            {user && (
              <p
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                  color: "orchid",
                  textDecoration: "underline",
                }}
              >
                Logout
              </p>
            )}
            {!user && (
              <>
                <p>
                  <Link to="/login">Login</Link>
                </p>
                <hr />
                <p>
                  <Link to="/signup">Signup</Link>
                </p>
              </>
            )}
            <hr />
            <p>
              <Link to="/contact" style={{ color: "orange" }}>
                Contact
              </Link>
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
