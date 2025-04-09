// src/components/Layout.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import 'tailwindcss';

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-grow">
        <Sidebar showMobile={showSidebar} />
        <main className="flex-grow bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
