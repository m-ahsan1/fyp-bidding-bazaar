import React from "react";
import AdminNavigation from "../components/AdminNavigation";
import ReactGA from 'react-ga';

ReactGA.initialize("G-C4R8RPWSJK")

function AdminHomePage()
{
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