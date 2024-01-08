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
      <Link to="/admin">Logout</Link>
      </div>

      
      <div className="content">
              
      <br /><br/><br />  
      <h1 style={{color:'black', fontSize:"30px"}}>Analytics</h1>
      <br />
        <p>See advance stats at <Link style={{color:'blue'}} to="https://analytics.google.com/analytics/web/#/p418197527/reports/reportinghub">google analytics</Link></p>
        <br />
        <h1 style={{color:'black', fontSize:"30px"}}>System Stats</h1>
        <AnalyticsComponent />
      </div>
    </div>
  );
}

export default AdminNavigation;
