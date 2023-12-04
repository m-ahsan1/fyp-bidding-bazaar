import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"

function MainPage() {
  return (
    <>
    <Navbar />
    <div className="flex items-center flex-row">
      <div>
        <Sidebar />
      </div>
    </div>
    
    </>
  );
}

export default MainPage;
