import React from 'react';
import './AdminNavigation.css'; // Import CSS file
import { Link } from 'react-router-dom';
import AnalyticsComponent from "./Analytics";


function AdminNavigation() {
  return (
    <div>
      <div className="sidebar">
      <Link></Link>
      <Link to="/adminhome">Analytics</Link>
      <Link to="/adminhome">Logout</Link>
      </div>

      <div className="content">
        <br /><br/><br />

        <h1>Analytics</h1>
        
        <p>See advance stats at <Link style={{color:'blue'}} to="https://analytics.google.com/analytics/web/#/p418197527/reports/reportinghub">google analytics</Link></p>
        <br />
        <AnalyticsComponent />
      </div>
    </div>
  );
}

export default AdminNavigation;
