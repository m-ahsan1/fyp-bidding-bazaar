import React from "react";
import { Link } from "react-router-dom";
import AnalyticsComponent from "./Analytics";

function AdminAnalytics() {
  return (
    <center>
    <div className="content" style={{}}>
              
    <br /><br/><br />  
    <h1 style={{color:'black', fontSize:"30px"}}>Analytics</h1>
    <br />
      <p>See advance stats at <Link style={{color:'blue'}} to="https://analytics.google.com/analytics/web/#/p418197527/reports/reportinghub">google analytics</Link></p>
      <br />
      <h1 style={{color:'black', fontSize:"30px"}}>System Stats</h1>
      <AnalyticsComponent />
    </div>
    </center>
  );
}

export default AdminAnalytics;