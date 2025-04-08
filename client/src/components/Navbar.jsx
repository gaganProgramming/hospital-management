// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header  className="bg-gray-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">HealthHub</h1>
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
