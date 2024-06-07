// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

const Subbar = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <div id="secondBar">
        <br />
        <center>
        <span>
          &nbsp;
          {user ? (
              <a href="#"><Link to="/listings">Post Car</Link></a>
            ) : (
              <span style={{ cursor: "not-allowed" }}>Post Car</span>
            )}
            &nbsp; &nbsp;
          <a href="#"><Link to="/blogs">Blogs</Link></a> &nbsp; &nbsp;
          <a href="#"><Link to="/team">Team</Link></a> &nbsp; &nbsp;
          <a href="#"><Link to="/predict">Predict Price</Link></a> &nbsp; &nbsp;
        </span>
        </center>
        <hr />
      </div>
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
            <Dropdown.Item href="#"><Link to="/listings">Post Car</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/predict">Predict Price</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/blogs">Blogs</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/team">Team</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <br></br>
    </div>
  );
  /*return (
    <div className="flex h-screen bg-gray-200">
      { Sidebar }
      <div className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-semibold mb-4">Menu</h1>
        <ul>
          <li className="mb-2 text-gray-300 hover:text-white">
            
          </li>

          <li className="mb-2 text-gray-300 hover:text-white">
            
          </li>
          <li className="mb-2 text-gray-300 hover:text-white">
            
          </li>
        </ul>
      </div>
    </div>
  ); */
};

export default Subbar;
