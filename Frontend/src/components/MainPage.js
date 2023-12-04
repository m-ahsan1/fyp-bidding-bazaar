import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

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
