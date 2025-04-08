// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import "tailwindcss";


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
