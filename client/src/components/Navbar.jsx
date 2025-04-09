import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className=" top-0 left-0 w-full z-50 bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Hamburger for small screens */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden text-2xl focus:outline-none"
          >
            <HiMenu />
          </button>
          <h1 className="text-xl font-bold tracking-wide">HealthHub</h1>
        </div>

        <div className="space-x-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-800 font-medium transition"
            >
              🚪 Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100 font-medium transition"
            >
              🔐 Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
