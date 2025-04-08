// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";

export default function Home() {
  const [dashboardData, setDashboardData] = useState(null);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchRevenue();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:10000/api/dashboard");
      const data = await res.json();
      setDashboardData(data);
    } catch (err) {
      console.error("❌ Failed to load dashboard:", err);
    }
  };

  const fetchRevenue = async () => {
    try {
      const res = await fetch("http://localhost:10000/api/billing/summary");
      const data = await res.json();
      setRevenue(data.paymentsReceived || 0);
    } catch (err) {
      console.error("❌ Failed to load revenue:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !dashboardData) {
    return <div className="text-center text-lg mt-10">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Patients" value={dashboardData.totalPatients} icon="🧑‍⚕️" />
        <SummaryCard title="Appointments Today" value={dashboardData.appointmentsToday} icon="📅" />
        <SummaryCard title="Total Staff" value={dashboardData.totalStaff} icon="👨‍🔬" />
        <SummaryCard title="Revenue (This Month)" value={`₹${revenue}`} icon="💰" />
      </div>
    </div>
  );
}
