import React from "react";
import AdminNavigation from "./AdminNavigation";

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