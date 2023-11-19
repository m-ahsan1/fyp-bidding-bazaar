// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-semibold mb-4">Sidebar</h1>
        <ul>
          <li className="mb-2 text-gray-300 hover:text-white">
            <Link to="/listings">Used Cars</Link>
          </li>
          <li className="mb-2 text-gray-300 hover:text-white">
            <Link to="/listings">Blogs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
