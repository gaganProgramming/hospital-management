import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaHome,
  FaMoneyBillWave,
} from "react-icons/fa";

const Sidebar = ({ showMobile }) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
      isActive
        ? "bg-blue-200 font-semibold text-blue-800"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <aside
      className={`${
        showMobile ? "block" : "hidden"
      } md:block w-64 min-h-screen bg-white shadow-md p-6`}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">📋 Menu</h2>
      <nav className="flex flex-col gap-2">
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
