import React from "react";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav>
    <div id='RealNav'>
      <div id="logo-container">
       <Link to='/' style={{ textDecoration: 'none' }}> <h1 id="logo" ><b>BiddingBazaar</b></h1></Link>
      </div>
      <div id="rightnav">
        <button type="button" className="btn btn-outline-info" id="search-btn">🔍 Search &#9660;</button>&nbsp;&nbsp;
        <ul id="navbar-list">
          <li><a href="#">HOW IT WORKS</a></li>
          <li>│</li>
          <li><a href="#">LOG IN</a></li>
          <li><a href="#">SIGN IN</a></li>
          <li ><a href="#" style={{ color: 'orange' }}>FREELANCER?</a></li>
        </ul>
      </div>
    </div>

    <div id='mobileNav' style={{ backgroundColor: '#f9f9f9' }}>
      <h1 id="logo" >BiddingBazaar</h1>
      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" id='MobileNabBarButton' >☰</button>
    </div>

    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel"></h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body" style={{ padding: '20px' }}>
        <p>🔍 Search</p>
        <hr />
        <p>HOW It WORKS</p><hr />
        <p>LOG IN</p><hr />
        <p>SIGN UP</p><hr />
        <p style={{ color: 'orange' }}>FREELANCER?</p>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
