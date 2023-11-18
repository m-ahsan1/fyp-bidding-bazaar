// Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-semibold mb-4">Sidebar</h1>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-gray-300 hover:text-white">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-300 hover:text-white">
              About
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-300 hover:text-white">
              Services
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
