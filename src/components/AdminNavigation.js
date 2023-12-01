import React from 'react';
import './AdminNavigation.css'; // Import your CSS file
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminNavigation() {
  return (
    <div>
      <div className="sidebar">
      <Link></Link>
      <Link to="/adminhome">Analytics</Link>
      <Link to="/adminhome">Logout</Link>
      </div>

      <div className="content">
        <h2>Responsive Sidebar Example</h2>
        <p>This example uses media queries to transform the sidebar to a top navigation bar when the screen size is 700px or less.</p>
        <p>We have also added a media query for screens that are 400px or less, which will vertically stack and center the navigation links.</p>
        <h3>Resize the browser window to see the effect.</h3>
      </div>
    </div>
  );
}

export default AdminNavigation;
