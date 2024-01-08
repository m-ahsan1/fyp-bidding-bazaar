import React, { useEffect }  from "react";
import AdminNavigation from "../components/AdminNavigation";
import ReactGA from 'react-ga';
import { Link, useNavigate } from "react-router-dom";

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
        <div className="flex items-center flex-row">
          <div>
            <AdminNavigation />
          </div>
        </div>
        
        </>
      );
}

export default AdminHomePage;