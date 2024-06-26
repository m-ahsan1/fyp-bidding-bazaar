import React, { useEffect }  from "react";
import AdminNavigation from "../components/AdminNavigation";
import ReactGA from 'react-ga';
import { useNavigate } from "react-router-dom";
import AdminAnalytics from "../components/adminanalytics";

ReactGA.initialize("G-C4R8RPWSJK")

function AdminHomePage()
{

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token exists, redirect to /admin
      navigate('/admin', { replace: true });
    }
  }, []);

    return (
        <>
 
            <AdminNavigation />
            <AdminAnalytics />
        
        
        </>
      );
}

export default AdminHomePage;