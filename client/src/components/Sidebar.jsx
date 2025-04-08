// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaHome,
  FaMoneyBillWave 
} from "react-icons/fa";
import "tailwindcss";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-100 ${
      isActive ? "bg-blue-200 font-semibold text-blue-800" : "text-gray-700"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md p-4">
      <nav className="flex flex-col gap-3">
        <NavLink to="/" className={linkClasses}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/patients" className={linkClasses}>
          <FaUserInjured /> Patients
        </NavLink>
        <NavLink to="/staff" className={linkClasses}>
          <FaUserMd /> Staff
        </NavLink>
        <NavLink to="/appointments" className={linkClasses}>
          <FaCalendarCheck /> Appointments
        </NavLink>
        <NavLink to="/finance" className={linkClasses}>
          <FaMoneyBillWave /> Finance
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
