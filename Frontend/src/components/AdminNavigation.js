import React, { useState } from 'react';
import './Navbar.css'; // Import CSS file
import { Link } from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";


function AdminNavigation() {
  return (
    <div>
      <div id="secondBar">
        <br />
        <center>
        <span>
          &nbsp;
            &nbsp; &nbsp;
          <a href="#"><Link to="/adminhome">Home</Link></a> &nbsp; &nbsp;
          <a href="#"><Link to="/writeblog">Write Blog</Link></a> &nbsp; &nbsp;
          <a href="#"><Link to="/message">Messages</Link></a> &nbsp; &nbsp;
          <a href="#"><Link to="/admin">Logout</Link></a>
          
        </span>
        
        </center>
        <br></br>
        <hr />
      </div>
      <center>
      <div id="secondBarMobile">
        <hr />
        <Dropdown>
          <hr />
          <Dropdown.Toggle
            variant="primary"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "grey"
            }}
          >
            More options
          </Dropdown.Toggle>
          <hr />
          
          <Dropdown.Menu style={{ width: "100%" }}>
            <Dropdown.Item href="#"><Link to="/adminhome">Home</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/writeblog">Write Blog</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/message">Messages</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/admin">Log out</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br></br>
      </div>
      </center>
      <br></br>
    </div>
  );
}

export default AdminNavigation;
